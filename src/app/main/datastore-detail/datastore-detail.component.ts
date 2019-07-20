import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { FuseNavigationService } from '../../../@fuse/components/navigation/navigation.service';
import { DatastoreService } from '../../service/datastore.service';
import { Datastore, DatastoreVersion } from '../../model/datastore';
import { Notifier } from '../../model/notifier';
import { ArtifactInstance } from '../../model/artifact';
import { Server } from '../../model/server';
import { isObsoleteCss } from '../../shared/util-css';

@Component({
    selector: 'app-datastore-detail',
    templateUrl: './datastore-detail.component.html',
    styleUrls: ['./datastore-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DatastoreDetailComponent implements OnInit {

    datastore: Datastore;
    notifyObjs: Notifier[] = [];
    notifyObjsServer: Notifier[] = [];

    constructor(
        private route: ActivatedRoute,
        private datastoreService: DatastoreService,
        private fuseNavigationService: FuseNavigationService
    ) { }

    ngOnInit(): void {
        this.getDatastore();
    }

    getDatastore(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.datastoreService.getDatastore(id)
            .subscribe(datastore => {
                this.datastore = datastore;
                this.datastore.versions.forEach( value => {
                    this.notifyObjs[value.id] = new Notifier();
                    this.notifyObjsServer[value.id] = new Notifier();
                });
                this.addCurrentNavItem();
            });
    }

    getArtifactInstances(version: DatastoreVersion): ArtifactInstance[] {
        let artifacts: ArtifactInstance[] = [];
        version.instances.forEach( value => {
                artifacts = artifacts.concat(value.artifactInstances);
            }
        );
        return artifacts;
    }

    getArtifactServers(version: DatastoreVersion): Server[] {
        const servers: Server[] = [];
        version.instances.forEach( value => {
                servers.push(value.server);
            }
        );
        return servers;
    }

    applyFilter(filterValue: string): void {
        this.datastore.versions.forEach( value => {
            this.notifyObjs[value.id].valueChanged(filterValue);
            this.notifyObjsServer[value.id].valueChanged(filterValue);
        });
    }

    isObsoleteCss(date: Date): string {
        return isObsoleteCss(date);
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
                    title: this.datastore.name,
                    type: 'item',
                    icon: 'storage',
                    url: '/datastore-detail/' + this.datastore.id
                }
            ]
        };

        // Add the new nav item at the beginning of the navigation
        this.fuseNavigationService.removeNavigationItem('current-item');
        this.fuseNavigationService.removeNavigationItem('last-selection');
        this.fuseNavigationService.addNavigationItem(newNavItem, 'start');
    }

}