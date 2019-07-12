import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerListComponent } from './main/server-list/server-list.component';
import { SampleComponent } from './main/sample/sample.component';

const routes: Routes = [
    { path: '', component: SampleComponent},
    { path: 'server-list', component: ServerListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
