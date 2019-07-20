import { Component, Input, OnInit } from '@angular/core';
import { ArtifactInstance } from '../../../model/artifact';
import { MatTableDataSource } from '@angular/material';
import { DatastoreVersion } from '../../../model/datastore';
import { Notifier } from '../../../model/notifier';

@Component({
  selector: 'app-datastore-version-application',
  templateUrl: './datastore-version-application.component.html',
  styleUrls: ['./datastore-version-application.component.scss']
})
export class DatastoreVersionApplicationComponent implements OnInit {

    @Input() artifacts: ArtifactInstance[];
    dataSource: MatTableDataSource<ArtifactInstance>;
    @Input() version: DatastoreVersion;
    @Input() notify = new Notifier();
    notify3 = new Notifier();

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
        this.notify3.valueChanged(filterValue);
    }

}

