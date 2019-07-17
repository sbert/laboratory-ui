import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MiddlewareInstance, MiddlewareVersion } from '../../../model/middleware';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ArtifactInstance } from '../../../model/artifact';
import { Notifier } from '../middleware-detail.component';

@Component({
  selector: 'app-middleware-version-application',
  templateUrl: './middleware-version-application.component.html',
  styleUrls: ['./middleware-version-application.component.scss']
})
export class MiddlewareVersionApplicationComponent implements OnInit {

    @Input() artifacts: ArtifactInstance[];
    dataSource: MatTableDataSource<ArtifactInstance>;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @Input() notify = new Notifier();

    applicationDisplayedColumns: string[] = ['artifact-id', 'version', 'environment'];

    constructor() { }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.artifacts);
        this.dataSource.paginator = this.paginator;
        this.notify.valueChanged = (d: string) => {
            console.log(`Parent has notified changes to ${d}`);
            this.applyFilter(d);
        };
        this.artifacts.forEach( it => {
            it.search = it.environmentType + it.artifactVersion.number + it.artifactVersion.artifact.artifactId;
        });
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}
