import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MiddlewareInstance, MiddlewareVersion } from '../../../model/middleware';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ArtifactInstance } from '../../../model/artifact';

@Component({
  selector: 'app-middleware-version-application',
  templateUrl: './middleware-version-application.component.html',
  styleUrls: ['./middleware-version-application.component.scss']
})
export class MiddlewareVersionApplicationComponent implements OnInit {

    @Input() artifacts: ArtifactInstance[];
    dataSource: MatTableDataSource<ArtifactInstance>;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    applicationDisplayedColumns: string[] = ['artifact-id', 'version', 'environment'];

    constructor() { }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.artifacts);
        this.dataSource.paginator = this.paginator;
    }

}
