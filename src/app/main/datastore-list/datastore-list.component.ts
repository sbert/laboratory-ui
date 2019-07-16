import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Datastore } from '../../model/datastore';
import { DatastoreService } from '../../service/datastore.service';
import { fuseAnimations } from '../../../@fuse/animations';

@Component({
  selector: 'app-datastore-list',
  templateUrl: './datastore-list.component.html',
  styleUrls: ['./datastore-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DatastoreListComponent implements OnInit {

    displayedColumns: string[] = ['type', 'name', 'version'];

    dataSource: MatTableDataSource<Datastore>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(
        private datastoreService: DatastoreService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getDatastores();
    }

    getDatastores(): void {
        this.datastoreService.getDatastores()
            .subscribe(datastores => {
                this.dataSource = new MatTableDataSource(datastores);

                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    navigateTo(row: any) {
        this.router.navigate(['/datastore-detail/' + row.id]);
    }

    applyFilter(filterValue: string) {
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
            console.log(nowPlusOneYear)
            if (dateAsDate <= nowPlusOneYear) {
                return 'obsolete1y';
            }
        }
    }

}
