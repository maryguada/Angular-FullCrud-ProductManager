import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'new', component: NewComponent},
  { path: 'show/:id', component: ShowComponent},
  { path: 'edit/:id', component: EditComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
