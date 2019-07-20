import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Datastore, DatastoreVersion } from '../../model/datastore';
import { DatastoreService } from '../../service/datastore.service';
import { fuseAnimations } from '../../../@fuse/animations';
import { isObsoleteCss } from '../../shared/util-css';
import { MiddlewareVersion } from '../../model/middleware';

@Component({
  selector: 'app-datastore-list',
  templateUrl: './datastore-list.component.html',
  styleUrls: ['./datastore-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DatastoreListComponent implements OnInit {

    displayedColumns: string[] = ['name', 'type', 'version', 'end-of-support', 'nb-instance', 'nb-artifact'];

    dataSource: MatTableDataSource<DatastoreVersion>;
    versions: DatastoreVersion[] = [];

    spans = [];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(
        private datastoreService: DatastoreService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.getDatastores();
    }

    getDatastores(): void {
        this.datastoreService.getDatastores()
            .subscribe(datastores => {
                datastores.forEach(it => {
                it.versions.forEach( version => {
                    version.datastore = new Datastore();
                    version.datastore.name = it.name;
                    version.datastore.type = it.type;
                    version.datastore.id = it.id;
                });
                this.versions = this.versions.concat(it.versions);
            });
                this.versions.forEach(it => {
                    it.search = it.datastore.type + it.datastore.name + it.number + it.endOfSupport;
                });
                this.dataSource = new MatTableDataSource(this.versions);

                this.cacheSpan('name', d => d.datastore.name);
                this.cacheSpan('type', d => d.datastore.name + d.datastore.type);

                this.dataSource.paginator = this.paginator;
            });
    }

    navigateTo(row: any): void {
        this.router.navigate(['/datastore-detail/' + row.datastore.id]);
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        this.spans = [];
        this.cacheSpan('name', d => d.datastore.name);
        this.cacheSpan('type', d => d.datastore.name + d.datastore.type);

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    countArtifactsByVersion(version: DatastoreVersion): number {
        return version.instances.reduce((accu, current) => {
            return accu + current.artifactInstances.length;
        }, 0);
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

    isObsoleteCss(date: Date): string {
        return isObsoleteCss(date);
    }

}
