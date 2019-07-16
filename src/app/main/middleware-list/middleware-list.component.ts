import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Middleware, MiddlewareVersion } from '../../model/middleware';
import { MiddlewareService } from '../../service/middleware.service';
import { Router } from '@angular/router';
import { fuseAnimations } from '../../../@fuse/animations';

@Component({
    selector: 'app-middleware-list',
    templateUrl: './middleware-list.component.html',
    styleUrls: ['./middleware-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MiddlewareListComponent implements OnInit {

    displayedColumns: string[] = ['name', 'version', 'editor', 'end-of-support', 'nb-server', 'nb-artifact'];

    dataSource: MatTableDataSource<Middleware>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(
        private middlewareService: MiddlewareService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.getMiddlewares();
    }

    getMiddlewares(): void {
        this.middlewareService.getMiddlewares()
            .subscribe(middlewares => {
                this.dataSource = new MatTableDataSource(middlewares);

                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    countArtifactsByVersion(version: MiddlewareVersion): number {
        return version.instances.reduce((accu, current) => {
            return accu + current.artifactInstances.length;
        }, 0);
    }

    navigateTo(row: any): void {
        this.router.navigate(['/middleware-detail/' + row.id]);
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    isObsoleteCss(date: Date): string {
        const dateAsDate = new Date(date);
        if (dateAsDate.getTime() <= Date.now()) {
            return 'obsolete';
        } else {
            const nowPlusOneYear: Date = new Date(Date.now());
            nowPlusOneYear.setFullYear(nowPlusOneYear.getFullYear() + 1);
            console.log(nowPlusOneYear);
            if (dateAsDate <= nowPlusOneYear) {
                return 'obsolete1y';
            }
        }
    }

}
