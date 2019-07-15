import { Component, Input, OnInit } from '@angular/core';
import { Server } from '../../model/server';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { FuseNavigationService } from '../../../@fuse/components/navigation/navigation.service';
import { MiddlewareInstance, MiddlewareVersion } from '../../model/middleware';
import { ArtifactInstance } from '../../model/artifact';
import { fuseAnimations } from '../../../@fuse/animations';
import { Datastore, DatastoreInstance } from '../../model/datastore';

@Component({
    selector: 'app-server-detail',
    templateUrl: './server-detail.component.html',
    styleUrls: ['./server-detail.component.scss'],
    animations   : fuseAnimations
})
export class ServerDetailComponent implements OnInit {
    server: Server;
    middlewareInstances: MiddlewareInstance[];
    artifactInstances: ArtifactInstance[];
    datastoreInstances: DatastoreInstance[];

    MWdisplayedColumns: string[] = ['name', 'editor', 'version', 'end-of-support'];
    ArtifactdisplayedColumns: string[] = ['artifact-id', 'version', 'environment'];
    DatastoredisplayedColumns: string[] = ['type', 'name', 'version', 'end-of-support'];

    constructor(
        private route: ActivatedRoute,
        private serverService: ServerService,
        private fuseNavigationService: FuseNavigationService,
    ) {}

    ngOnInit(): void {
        this.getServer();
        this.getMiddlewares();
        this.getArtifacts();
        this.getDatastores();
    }

    getServer(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.serverService.getServer(id)
            .subscribe(server => {
                this.server = server;
                this.addCurrentNavItem();
            });
    }

    getMiddlewares(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.serverService.getMiddlewares(id)
            .subscribe(middlewareInstances => {
                this.middlewareInstances = middlewareInstances.map(data => new MiddlewareInstance(data));
            });
    }

    getDatastores(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.serverService.getDatastores(id)
            .subscribe(datastoreInstances => {
                this.datastoreInstances = datastoreInstances.map(data => new DatastoreInstance(data));
            });
    }

    getArtifacts(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.serverService.getArtifacts(id)
            .subscribe(artifactInstances => {
                this.artifactInstances = artifactInstances;
            });
    }

    isObsoleteCss(date: Date): string {
        if (date.getTime() <= Date.now()) {
            return 'obsolete';
        } else {
            const nowPlusOneYear: Date = new Date(Date.now());
            nowPlusOneYear.setFullYear(nowPlusOneYear.getFullYear() + 1);
            console.log(nowPlusOneYear)
            if (date <= nowPlusOneYear) {
                return 'obsolete1y';
            }
        }
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
        this.fuseNavigationService.removeNavigationItem('last-selection');
        this.fuseNavigationService.addNavigationItem(newNavItem, 'start');
    }

}
