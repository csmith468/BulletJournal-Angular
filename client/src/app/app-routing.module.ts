import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './helpers/guards/auth.guard';
import { MorningChecklistComponent } from './components/checklists/morning-checklist/morning-checklist.component';
import { NightChecklistComponent } from './components/checklists/night-checklist/night-checklist.component';
import { MorningTableComponent } from './components/tables/morning-table/morning-table.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', 
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'checklists',
        loadChildren: () => import('./components/checklists/checklists.module')
          .then(m => m.ChecklistsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./components/tables/tables.module')
          .then(m => m.TablesModule)
      }
      // {path: 'members/:username', component: MemberDetailComponent, resolve: {member: memberDetailedResolver}},
      // {path: 'member/edit', component: MemberEditComponent, canDeactivate: [preventUnsavedChangesGuard]},
      // {path: 'admin', component: AdminPanelComponent}, // set to view-only if not admin, no longer using adminGuard
      // {path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard]},
    ]
  },
  // {path: 'about', component: AboutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
