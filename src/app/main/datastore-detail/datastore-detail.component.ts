import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { FuseNavigationService } from '../../../@fuse/components/navigation/navigation.service';
import { DatastoreService } from '../../service/datastore.service';
import { Datastore } from '../../model/datastore';

@Component({
    selector: 'app-datastore-detail',
    templateUrl: './datastore-detail.component.html',
    styleUrls: ['./datastore-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DatastoreDetailComponent implements OnInit {

    datastore: Datastore;

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
