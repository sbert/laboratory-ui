import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerListComponent } from './main/server-list/server-list.component';
import { SampleComponent } from './main/sample/sample.component';
import { ServerDetailComponent } from './main/server-detail/server-detail.component';
import { DatastoreListComponent } from './main/datastore-list/datastore-list.component';
import { DatastoreDetailComponent } from './main/datastore-detail/datastore-detail.component';
import { MiddlewareListComponent } from './main/middleware-list/middleware-list.component';
import { MiddlewareDetailComponent } from './main/middleware-detail/middleware-detail.component';
import { ArtifactListComponent } from './main/artifact-list/artifact-list.component';
import { ArtifactDetailComponent } from './main/artifact-detail/artifact-detail.component';

const routes: Routes = [
    { path: '', component: SampleComponent},
    { path: 'server-list', component: ServerListComponent },
    { path: 'server-detail/:id', component: ServerDetailComponent },
    { path: 'datastore-list', component: DatastoreListComponent},
    { path: 'datastore-detail/:id', component: DatastoreDetailComponent },
    { path: 'middleware-list', component: MiddlewareListComponent},
    { path: 'middleware-detail/:id', component: MiddlewareDetailComponent },
    { path: 'artifact-list', component: ArtifactListComponent },
    { path: 'artifact-detail/:id', component: ArtifactDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
