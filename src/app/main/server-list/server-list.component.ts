import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {ServerService} from '../../service/server.service';
import {Server} from '../../model/server';
import { Router } from '@angular/router';
import { fuseAnimations } from '../../../@fuse/animations';
import { Notifier } from '../../model/notifier';

@Component({
    selector: 'app-server-list',
    templateUrl: './server-list.component.html',
    styleUrls: ['./server-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ServerListComponent implements OnInit {

    servers: Server[];
    notifyObj: Notifier = new Notifier();

    constructor(
        private serverService: ServerService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getServers();
    }

    getServers(): void {
        this.serverService.getServers()
            .subscribe(servers => {
                this.servers = servers;
            });
    }

    applyFilter(filterValue: string): void {
        this.notifyObj.valueChanged(filterValue);
    }

}
