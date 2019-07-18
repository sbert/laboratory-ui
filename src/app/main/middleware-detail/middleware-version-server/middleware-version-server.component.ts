import { Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Server } from '../../../model/server';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MiddlewareVersion } from '../../../model/middleware';
import { Notifier } from '../../../model/notifier';
import { ServerListTableComponent } from '../../server-list/server-list-table/server-list-table.component';

@Component({
  selector: 'app-middleware-version-server',
  templateUrl: './middleware-version-server.component.html',
  styleUrls: ['./middleware-version-server.component.scss']
})
export class MiddlewareVersionServerComponent implements OnInit {

    @Input() servers: Server[];
    dataSource: MatTableDataSource<Server>;
    @Input() version: MiddlewareVersion;
    @Input() notify = new Notifier();
    notify2 = new Notifier();

    constructor() { }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.servers);
        this.notify.valueChanged = (d: string) => {
            this.applyFilter(d);
        };
        this.servers.forEach( it => {
            it.search = it.ip + it.name + it.osVersion.number + it.osVersion.os.name;
        });
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.notify2.valueChanged(filterValue);
    }

}