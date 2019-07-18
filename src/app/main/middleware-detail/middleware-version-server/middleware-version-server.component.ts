import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Server } from '../../../model/server';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MiddlewareVersion } from '../../../model/middleware';
import { Notifier } from '../middleware-detail.component';

@Component({
  selector: 'app-middleware-version-server',
  templateUrl: './middleware-version-server.component.html',
  styleUrls: ['./middleware-version-server.component.scss']
})
export class MiddlewareVersionServerComponent implements OnInit {

    @Input() servers: Server[];
    dataSource: MatTableDataSource<Server>;
    @Input() version: MiddlewareVersion;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @Input() notify = new Notifier();

    applicationDisplayedColumns: string[] = ['name', 'ip', 'os', 'os-version'];

    constructor() { }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.servers);
        this.dataSource.paginator = this.paginator;
        this.notify.valueChanged = (d: string) => {
            console.log(`Parent has notified changes to ${d}`);
            this.applyFilter(d);
        };
        this.servers.forEach( it => {
            it.search = it.ip + it.name + it.osVersion.number + it.osVersion.os.name;
        });
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}