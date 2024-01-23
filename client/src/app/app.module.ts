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
import { TextInputComponent } from './components/account/register/form-register-validation/text-register/text-register.component';
import { NotFoundComponent } from './components/static/not-found/not-found.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
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
import { DropdownInputComponent } from './components/account/register/form-register-validation/dropdown-register/dropdown-register.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    TextInputComponent,
    NotFoundComponent,
    MorningTableComponent,
    SidenavComponent,
    BodyComponent,
    SubLevelMenuComponent,
    SublevelMenuComponent,
    HeaderComponent,
    LoginComponent,
    AboutComponent,
    ProfileComponent,
    DropdownInputComponent
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
