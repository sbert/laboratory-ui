import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerListComponent } from './main/server-list/server-list.component';
import { SampleComponent } from './main/sample/sample.component';
import { ServerDetailComponent } from './main/server-detail/server-detail.component';
import { DatastoreListComponent } from './main/datastore-list/datastore-list.component';
import { DatastoreDetailComponent } from './main/datastore-detail/datastore-detail.component';

const routes: Routes = [
    { path: '', component: SampleComponent},
    { path: 'server-list', component: ServerListComponent },
    { path: 'server-detail/:id', component: ServerDetailComponent },
    { path: 'datastore-list', component: DatastoreListComponent},
    { path: 'datastore-detail/:id', component: DatastoreDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
