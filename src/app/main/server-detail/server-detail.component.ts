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
    DatastoredisplayedColumns: string[] = ['type', 'name', 'version'];

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
                this.datastoreInstances = datastoreInstances;
            });
    }

    getArtifacts(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.serverService.getArtifacts(id)
            .subscribe(artifactInstances => {
                this.artifactInstances = artifactInstances;
            });
    }


    isObsolete(date: Date): boolean {
        console.log(date);
        console.log(new Date());
        console.log((new Date(date)).getTime() < Date.now());
        // const test = new MiddlewareVersion();
        // test.endOfSupport = new Date('2012-01-01');
        // console.log(test.endOfSupport.getTime() < Date.now());
        return (new Date(date)).getTime() < Date.now();
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
