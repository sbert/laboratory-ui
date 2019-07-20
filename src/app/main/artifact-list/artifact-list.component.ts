import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Artifact, ArtifactInstance } from '../../model/artifact';
import { Notifier } from '../../model/notifier';
import { ArtifactService } from '../../service/artifact.service';
import { Router } from '@angular/router';
import { fuseAnimations } from '../../../@fuse/animations';

@Component({
  selector: 'app-artifact-list',
  templateUrl: './artifact-list.component.html',
  styleUrls: ['./artifact-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ArtifactListComponent implements OnInit {

    artifacts: ArtifactInstance[];
    notifyObj: Notifier = new Notifier();

    constructor(
        private artifactService: ArtifactService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getArtifacts();
    }

    getArtifacts(): void {
        this.artifactService.getArtifacts()
            .subscribe(artifacts => {
                this.artifacts = artifacts;
            });
    }

    applyFilter(filterValue: string): void {
        this.notifyObj.valueChanged(filterValue);
    }

}
