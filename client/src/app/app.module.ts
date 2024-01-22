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
import { HomeComponent } from './components/layout/home/home.component';
import { RegisterComponent } from './components/account/register/register.component';
import { TextInputComponent } from './components/layout/forms/text-input/text-input.component';
import { DatePickerComponent } from './components/layout/forms/date-picker/date-picker.component';
import { NotFoundComponent } from './components/static/not-found/not-found.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MorningChecklistComponent } from './components/data/checklists/morning-checklist/morning-checklist.component';
import { NightChecklistComponent } from './components/data/checklists/night-checklist/night-checklist.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SwitchInputComponent } from './components/layout/forms/switch-input/switch-input.component';
import { ErrorInterceptor } from './helpers/interceptors/error.interceptor';
import { JwtInterceptor } from './helpers/interceptors/jwt.interceptor';
import { MorningTableComponent } from './components/data/tables/morning-table/morning-table.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './helpers/interceptors/loading.interceptor';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { BodyComponent } from './components/layout/body/body.component';
import { SubLevelMenuComponent } from './components/layout/sidenav/sub-level-menu.component';
import { SublevelMenuComponent } from './components/layout/sidenav/sublevel-menu/sublevel-menu.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LoginComponent } from './components/account/login/login.component';
import { AboutComponent } from './components/static/about/about.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { DropdownInputComponent } from './components/layout/forms/dropdown-input/dropdown-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NightFormComponent } from './components/data/checklists/night-form/night-form.component';
import { TextboxComponent } from './components/form-group/form-question/textbox/textbox.component';
import { SwitchComponent } from './components/form-group/form-question/switch/switch.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    TextInputComponent,
    DatePickerComponent,
    NotFoundComponent,
    MorningChecklistComponent,
    NightChecklistComponent,
    SwitchInputComponent,
    MorningTableComponent,
    SidenavComponent,
    BodyComponent,
    SubLevelMenuComponent,
    SublevelMenuComponent,
    HeaderComponent,
    LoginComponent,
    AboutComponent,
    ProfileComponent,
    DropdownInputComponent,
    NightFormComponent,
    TextboxComponent,
    SwitchComponent
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
    }),
    NgSelectModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
