import { Component, OnInit, ViewChild } from '@angular/core';
import {ServerService} from '../../service/server.service';
import {Server} from '../../model/server';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.scss']
})
export class ServerListComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'ip', 'os', 'os-version', 'ram', 'cpu'];

    dataSource: MatTableDataSource<Server>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(
        private serverService: ServerService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getServers();
    }

    getServers(): void {
        this.serverService.getServers()
            .subscribe(servers => {
                this.dataSource = new MatTableDataSource(servers);

                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    navigateTo(row: any) {
        this.router.navigate(['/server-detail/' + row.id]);
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
            if (dateAsDate <= nowPlusOneYear) {
                return 'obsolete1y';
            }
        }
    }

}
