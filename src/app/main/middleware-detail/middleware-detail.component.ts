import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Middleware, MiddlewareVersion } from '../../model/middleware';
import { ActivatedRoute } from '@angular/router';
import { MiddlewareService } from '../../service/middleware.service';
import { FuseNavigationService } from '../../../@fuse/components/navigation/navigation.service';
import { fuseAnimations } from '../../../@fuse/animations';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ArtifactInstance } from '../../model/artifact';

@Component({
    selector: 'app-middleware-detail',
    templateUrl: './middleware-detail.component.html',
    styleUrls: ['./middleware-detail.component.scss'],
encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MiddlewareDetailComponent implements OnInit {

    middleware: Middleware;

    serverDisplayedColumns: string[] = ['server-name', 'server-ip'];
    applicationDisplayedColumns: string[] = ['server-name'];

    dataSource: MatTableDataSource<MiddlewareVersion>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(
        private route: ActivatedRoute,
        private middlewareService: MiddlewareService,
        private fuseNavigationService: FuseNavigationService
    ) { }

    ngOnInit(): void {
        this.getMiddleware();
    }

    getMiddleware(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.middlewareService.getMiddleware(id)
            .subscribe(middleware => {
                this.middleware = middleware;
                this.dataSource = new MatTableDataSource(middleware.versions);
                this.dataSource.paginator = this.paginator;
                this.addCurrentNavItem();
            });
    }

    getArtifactInstances(version: MiddlewareVersion): ArtifactInstance[] {
        let artifacts: ArtifactInstance[] = [];
        version.instances.forEach( value => {
                artifacts = artifacts.concat(value.artifactInstances);
            }
        );
        return artifacts;
    }

    isObsoleteCss(date: Date): string {
        const dateAsDate = new Date(date);
        if (dateAsDate.getTime() <= Date.now()) {
            return 'obsolete';
        } else {
            const nowPlusOneYear: Date = new Date(Date.now());
            nowPlusOneYear.setFullYear(nowPlusOneYear.getFullYear() + 1);
            if (dateAsDate <= nowPlusOneYear) {
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
                    title: this.middleware.name,
                    type: 'item',
                    icon: 'settings_ethernet',
                    url: '/middleware-detail/' + this.middleware.id
                }
            ]
        };

        // Add the new nav item at the beginning of the navigation
        this.fuseNavigationService.removeNavigationItem('current-item');
        this.fuseNavigationService.removeNavigationItem('last-selection');
        this.fuseNavigationService.addNavigationItem(newNavItem, 'start');
    }

}
