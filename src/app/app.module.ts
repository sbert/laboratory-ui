import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule, FuseWidgetModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { ServerListComponent } from './main/server-list/server-list.component';
import { MatBadgeModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatListModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { ServerDetailComponent } from './main/server-detail/server-detail.component';
import { DatastoreListComponent } from './main/datastore-list/datastore-list.component';
import { DatastoreDetailComponent } from './main/datastore-detail/datastore-detail.component';
import { MiddlewareListComponent } from './main/middleware-list/middleware-list.component';
import { MiddlewareDetailComponent } from './main/middleware-detail/middleware-detail.component';
import { MiddlewareVersionApplicationComponent } from './main/middleware-detail/middleware-version-application/middleware-version-application.component';
import { MiddlewareVersionServerComponent } from './main/middleware-detail/middleware-version-server/middleware-version-server.component';
import { ServerListTableComponent } from './main/server-list/server-list-table/server-list-table.component';
import { ArtifactListComponent } from './main/artifact-list/artifact-list.component';
import { ArtifactListTableComponent } from './main/artifact-list/artifact-list-table/artifact-list-table.component';
import { DatastoreVersionApplicationComponent } from './main/datastore-detail/datastore-version-application/datastore-version-application.component';
import { DatastoreVersionServerComponent } from './main/datastore-detail/datastore-version-server/datastore-version-server.component';
import { ArtifactDetailComponent } from './main/artifact-detail/artifact-detail.component';

const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'sample'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        ServerListComponent,
        ServerDetailComponent,
        DatastoreListComponent,
        DatastoreDetailComponent,
        MiddlewareListComponent,
        MiddlewareDetailComponent,
        MiddlewareVersionApplicationComponent,
        MiddlewareVersionServerComponent,
        ServerListTableComponent,
        ArtifactListComponent,
        ArtifactListTableComponent,
        DatastoreVersionApplicationComponent,
        DatastoreVersionServerComponent,
        ArtifactDetailComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatCardModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        FuseWidgetModule,
        MatListModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatBadgeModule,
        MatGridListModule,
        MatTabsModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
