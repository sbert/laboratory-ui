import { Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Server } from '../../../model/server';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DatastoreVersion } from '../../../model/datastore';
import { Notifier } from '../../../model/notifier';
import { ServerListTableComponent } from '../../server-list/server-list-table/server-list-table.component';

@Component({
    selector: 'app-datastore-version-server',
    templateUrl: './datastore-version-server.component.html',
    styleUrls: ['./datastore-version-server.component.scss']
})
export class DatastoreVersionServerComponent implements OnInit {

    @Input() servers: Server[];
    dataSource: MatTableDataSource<Server>;
    @Input() version: DatastoreVersion;
    @Input() notify = new Notifier();
    notify3 = new Notifier();

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
        this.notify3.valueChanged(filterValue);
    }

}
