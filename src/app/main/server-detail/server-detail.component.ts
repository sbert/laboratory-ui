import { Component, Input, OnInit } from '@angular/core';
import { Server } from '../../model/server';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { FuseNavigationService } from '../../../@fuse/components/navigation/navigation.service';

@Component({
    selector: 'app-server-detail',
    templateUrl: './server-detail.component.html',
    styleUrls: ['./server-detail.component.scss']
})
export class ServerDetailComponent implements OnInit {
    @Input() server: Server;

    constructor(
        private route: ActivatedRoute,
        private serverService: ServerService,
        private fuseNavigationService: FuseNavigationService
    ) {}

    ngOnInit(): void {
        this.getServer();
    }

    getServer(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.serverService.getServer(id)
            .subscribe(server => {
                this.server = server;
                this.addCurrentNavItem();
            });
    }

    addCurrentNavItem(): void {
        // Prepare the new nav item
        const newNavItem = {
            id       : 'last-selection',
            title    : 'LAST SELECTION',
            type     : 'group',
            children : [
                {
                    id: 'current-item',
                    title: this.server.name,
                    type: 'item',
                    icon: 'computer',
                    url: '/server-detail/' + this.server.id
                }
            ]
        };

        // Add the new nav item at the beginning of the navigation
        this.fuseNavigationService.removeNavigationItem('current-item');
        this.fuseNavigationService.addNavigationItem(newNavItem, 'start');
        console.log(this.fuseNavigationService.getCurrentNavigation());
    }

}
