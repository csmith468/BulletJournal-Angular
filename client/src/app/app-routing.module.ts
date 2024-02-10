import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/account/register/register.component';
import { NotFoundComponent } from './components/static/not-found/not-found.component';
import { authGuard } from './helpers/guards/auth.guard';
import { LoginComponent } from './components/account/login/login.component';
import { AboutComponent } from './components/static/about/about.component';
import { PreferencesComponent } from './components/account/preferences/preferences.component';
import { TableComponent } from './components/table/table.component';
import { typeResolver } from './helpers/resolvers/type.resolver';
import { ChecklistComponent } from './components/checklist/checklist.component';
import { checklistResolver } from './helpers/resolvers/checklist.resolver';
import { TrendsComponent } from './components/trends/trends.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', 
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {path: 'checklists/:source/edit/:id', component: ChecklistComponent, resolve: {metadata: typeResolver, checklist: checklistResolver}},
      {path: 'checklists/:source/add', component: ChecklistComponent, resolve: {metadata: typeResolver}},
      {path: 'data/:source', component: TableComponent, resolve: {metadata: typeResolver}},
      {path: 'trends/:source', component: TrendsComponent, resolve: {metadata: typeResolver}},
      {path: 'preferences', component: PreferencesComponent},
      // {path: 'profile', component: ProfileComponent}
      // {path: 'members/:username', component: MemberDetailComponent, resolve: {member: memberDetailedResolver}},
      // {path: 'member/edit', component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard]},
      // {path: 'admin', component: AdminPanelComponent}, // set to view-only if not admin, no longer using adminGuard
      // {path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard]},
    ]
  },
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
