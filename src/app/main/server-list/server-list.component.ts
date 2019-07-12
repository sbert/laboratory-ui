import { Component, OnInit } from '@angular/core';
import {ServerService} from '../../service/server.service';
import {Server} from '../../model/server';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.scss']
})
export class ServerListComponent implements OnInit {

    servers: Server[];

    displayedColumns: string[] = ['id', 'name', 'ip', 'os', 'os-version'];

    constructor(
        private serverService: ServerService
    ) { }

    ngOnInit() {
        this.getServers();
    }

    getServers(): void {
        this.serverService.getServers()
            .subscribe(servers => this.servers = servers);

    }

}
