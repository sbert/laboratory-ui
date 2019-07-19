import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ArtifactInstance } from '../../../model/artifact';
import { Notifier } from '../../../model/notifier';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { isObsoleteCss } from '../../../shared/util-css';

@Component({
    selector: 'app-artifact-list-table',
    templateUrl: './artifact-list-table.component.html',
    styleUrls: ['./artifact-list-table.component.scss']
})
export class ArtifactListTableComponent implements OnInit {

    displayedColumns: string[] = ['artifact-id', 'version', 'environment'];

    dataSource: MatTableDataSource<ArtifactInstance>;
    @Input() artifacts: ArtifactInstance[];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @Input() notify = new Notifier();

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.artifacts)
        this.dataSource.paginator = this.paginator;
        this.notify.valueChanged = (d: string) => {
            this.applyFilter(d);
        };
        this.artifacts.forEach( it => {
            it.search = it.artifactVersion.artifact.artifactId + it.artifactVersion.number + it.environmentType;
        });
    }

    navigateTo(row: any): void {
        this.router.navigate(['/artifact-detail/' + row.id]);
    }

    isObsoleteCss(date: Date): string {
        return isObsoleteCss(date);
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}
