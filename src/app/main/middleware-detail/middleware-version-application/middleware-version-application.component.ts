import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MiddlewareVersion } from '../../../model/middleware';
import { MatTableDataSource } from '@angular/material';
import { ArtifactInstance } from '../../../model/artifact';
import { Notifier } from '../../../model/notifier';

@Component({
    selector: 'app-middleware-version-application',
    templateUrl: './middleware-version-application.component.html',
    styleUrls: ['./middleware-version-application.component.scss']
})
export class MiddlewareVersionApplicationComponent implements OnInit {

    @Input() artifacts: ArtifactInstance[];
    dataSource: MatTableDataSource<ArtifactInstance>;
    @Input() version: MiddlewareVersion;
    @Input() notify = new Notifier();
    notify2 = new Notifier();

    constructor() { }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.artifacts);
        this.notify.valueChanged = (d: string) => {
            this.applyFilter(d);
        };
        this.artifacts.forEach( it => {
            it.search = it.artifactVersion.artifact.artifactId + it.artifactVersion.number + it.environmentType;
        });
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.notify2.valueChanged(filterValue);
    }

}
