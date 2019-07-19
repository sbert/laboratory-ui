import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Server } from '../../../model/server';
import { Router } from '@angular/router';
import { isObsoleteCss } from '../../../shared/util-css';
import { Notifier } from '../../../model/notifier';

@Component({
    selector: 'app-server-list-table',
    templateUrl: './server-list-table.component.html',
    styleUrls: ['./server-list-table.component.scss']
})
export class ServerListTableComponent implements OnInit {

    displayedColumns: string[] = ['name', 'ip', 'os', 'os-version', 'ram', 'cpu'];

    dataSource: MatTableDataSource<Server>;
    @Input() servers: Server[];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @Input() notify = new Notifier();

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.servers)
        this.dataSource.paginator = this.paginator;
        this.notify.valueChanged = (d: string) => {
            this.applyFilter(d);
        };
        this.servers.forEach( it => {
            it.search = it.ip + it.name + it.osVersion.number + it.osVersion.os.name;
        });
    }

    navigateTo(row: any): void {
        this.router.navigate(['/server-detail/' + row.id]);
    }

    isObsoleteCss(date: Date): string {
        return isObsoleteCss(date);
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}
