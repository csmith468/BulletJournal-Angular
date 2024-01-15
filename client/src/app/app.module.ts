import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from './components/register/register.component';
import { TextInputComponent } from './components/forms/text-input/text-input.component';
import { DatePickerComponent } from './components/forms/date-picker/date-picker.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MorningChecklistComponent } from './components/checklists/morning-checklist/morning-checklist.component';
import { NightChecklistComponent } from './components/checklists/night-checklist/night-checklist.component';
import { ChecklistHomeComponent } from './components/checklists/checklist-home/checklist-home.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SwitchInputComponent } from './components/forms/switch-input/switch-input.component';
import { ErrorInterceptor } from './helpers/interceptors/error.interceptor';
import { JwtInterceptor } from './helpers/interceptors/jwt.interceptor';
import { MorningTableComponent } from './components/tables/morning-table/morning-table.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './helpers/interceptors/loading.interceptor';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BodyComponent } from './components/body/body.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    TextInputComponent,
    DatePickerComponent,
    NotFoundComponent,
    MorningChecklistComponent,
    NightChecklistComponent,
    ChecklistHomeComponent,
    SwitchInputComponent,
    MorningTableComponent,
    SidenavComponent,
    BodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule.forRoot({
      type: 'square-jelly-box'
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
