import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Middleware, MiddlewareVersion } from '../../model/middleware';
import { MiddlewareService } from '../../service/middleware.service';
import { Router } from '@angular/router';
import { fuseAnimations } from '../../../@fuse/animations';
import { isObsoleteCss } from '../../shared/util-css';

@Component({
    selector: 'app-middleware-list',
    templateUrl: './middleware-list.component.html',
    styleUrls: ['./middleware-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MiddlewareListComponent implements OnInit {

    displayedColumns: string[] = ['name', 'version', 'editor', 'end-of-support', 'nb-server', 'nb-artifact'];

    dataSource: MatTableDataSource<MiddlewareVersion>;
    versions: MiddlewareVersion[] = [];

    spans = [];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(
        private middlewareService: MiddlewareService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.getMiddlewares();
    }

    getMiddlewares(): void {
        this.middlewareService.getMiddlewares()
            .subscribe(middlewares => {
                middlewares.forEach(it => {
                    it.versions.forEach( version => {
                        version.middleware = new Middleware();
                        version.middleware.name = it.name;
                        version.middleware.id = it.id;
                    });
                    this.versions = this.versions.concat(it.versions);
                });
                this.versions.forEach(it => {
                    it.search = it.middleware.name + it.editor + it.number + it.endOfSupport;
                });
                this.dataSource = new MatTableDataSource(this.versions);

                this.cacheSpan('name', d => d.middleware.name);

                this.dataSource.paginator = this.paginator;
            });
    }

    /**
     * Evaluated and store an evaluation of the rowspan for each row.
     * The key determines the column it affects, and the accessor determines the
     * value that should be checked for spanning.
     */
    cacheSpan(key, accessor): void {
        for (let i = 0; i < this.dataSource.filteredData.length;) {
            const currentValue = accessor(this.dataSource.filteredData[i]);
            let count = 1;

            // Iterate through the remaining rows to see how many match
            // the current value as retrieved through the accessor.
            for (let j = i + 1; j < this.dataSource.filteredData.length; j++) {
                if (currentValue !== accessor(this.dataSource.filteredData[j])) {
                    break;
                }

                count++;
            }

            if (!this.spans[i]) {
                this.spans[i] = {};
            }

            // Store the number of similar values that were found (the span)
            // and skip i to the next unique row.
            this.spans[i][key] = count;
            i += count;
        }
    }

    getRowSpan(col, index): boolean {
        return this.spans[index] && this.spans[index][col];
    }

    countArtifactsByVersion(version: MiddlewareVersion): number {
        return version.instances.reduce((accu, current) => {
            return accu + current.artifactInstances.length;
        }, 0);
    }

    navigateTo(row: any): void {
        this.router.navigate(['/middleware-detail/' + row.middleware.id]);
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        this.cacheSpan('name', d => d.middleware.name);

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    isObsoleteCss(date: Date): string {
        return isObsoleteCss(date);
    }

}
