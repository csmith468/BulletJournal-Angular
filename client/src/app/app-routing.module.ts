import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/layout/home/home.component';
import { RegisterComponent } from './components/account/register/register.component';
import { NotFoundComponent } from './components/static/not-found/not-found.component';
import { authGuard } from './helpers/guards/auth.guard';
import { LoginComponent } from './components/account/login/login.component';
import { AboutComponent } from './components/static/about/about.component';
import { ProfileComponent } from './components/account/profile/profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', 
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'checklists',
        loadChildren: () => import('./components/data/checklists/checklists.module')
          .then(m => m.ChecklistsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./components/data/tables/table.module')
          .then(m => m.TablesModule)
      }
      // {path: 'members/:username', component: MemberDetailComponent, resolve: {member: memberDetailedResolver}},
      // {path: 'member/edit', component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard]},
      // {path: 'admin', component: AdminPanelComponent}, // set to view-only if not admin, no longer using adminGuard
      // {path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard]},
    ]
  },
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
