import { Component, OnInit } from '@angular/core';
import { Artifact, ArtifactInstance } from '../../model/artifact';
import { ActivatedRoute } from '@angular/router';
import { ArtifactService } from '../../service/artifact.service';
import { FuseNavigationService } from '../../../@fuse/components/navigation/navigation.service';
import { isObsoleteCss } from '../../shared/util-css';

@Component({
  selector: 'app-artifact-detail',
  templateUrl: './artifact-detail.component.html',
  styleUrls: ['./artifact-detail.component.scss']
})
export class ArtifactDetailComponent implements OnInit {

    artifact: Artifact;
    ProdArtifacts: ArtifactInstance[];

    constructor(
        private route: ActivatedRoute,
        private artifactService: ArtifactService,
        private fuseNavigationService: FuseNavigationService
    ) {}

    ngOnInit(): void {
        this.getArtifact();
    }

    getArtifact(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.artifactService.getArtifact(id)
            .subscribe(artifact => {
                this.artifact = artifact;
                this.addCurrentNavItem();
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
                    title: this.artifact.artifactId,
                    type: 'item',
                    icon: 'apps',
                    url: '/artifact-detail/' + this.artifact.id
                }
            ]
        };

        // Add the new nav item at the beginning of the navigation
        this.fuseNavigationService.removeNavigationItem('current-item');
        this.fuseNavigationService.removeNavigationItem('last-selection');
        this.fuseNavigationService.addNavigationItem(newNavItem, 'start');
    }

}
