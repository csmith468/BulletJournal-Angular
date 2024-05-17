// @angular modules
import { LayoutModule } from '@angular/cdk/layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

// other external modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal'
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Interceptors

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/account/login/login.component';
import { ChecklistTypePrefsComponent } from './components/account/preferences/checklist-type-prefs/checklist-type-prefs.component';
import { GeneralPrefsComponent } from './components/account/preferences/general-prefs/general-prefs.component';
import { PreferencesComponent } from './components/account/preferences/preferences.component';
import { QuestionPrefsComponent } from './components/account/preferences/question-prefs/question-prefs.component';
import { SetupComponent } from './components/account/preferences/setup/setup.component';
import { DropdownInputComponent } from './components/account/register/form-register-validation/dropdown-register/dropdown-register.component';
import { TextInputComponent } from './components/account/register/form-register-validation/text-register/text-register.component';
import { RegisterComponent } from './components/account/register/register.component';
import { ChecklistsCompletedComponent } from './components/home/checklistsCompleted/checklists-completed.component';
import { HomeComponent } from './components/home/home.component';
import { BodyComponent } from './components/layout/body/body.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { ConfirmDialogComponent } from './components/layout/modals/confirm-dialog/confirm-dialog.component';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { SubLevelMenuComponent } from './components/layout/sidenav/sub-level-menu.component';
import { AboutComponent } from './components/static/about/about.component';
import { NotFoundComponent } from './components/static/not-found/not-found.component';
import { AreaChartComponent } from './components/trends/chart/area-chart/area-chart.component';
import { ChartComponent } from './components/trends/chart/chart.component';
import { TrendsComponent } from './components/trends/trends.component';
import { ErrorInterceptor } from './helpers/interceptors/error.interceptor';
import { JwtInterceptor } from './helpers/interceptors/jwt.interceptor';
import { LoadingInterceptor } from './helpers/interceptors/loading.interceptor';
import { CustomRouteReuseStrategy } from './services/components/routeReuseStategy';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AreaChartComponent,
    BodyComponent,
    ChartComponent,
    ChecklistsCompletedComponent,
    ChecklistTypePrefsComponent,
    ConfirmDialogComponent,
    DropdownInputComponent,
    GeneralPrefsComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    PreferencesComponent,
    QuestionPrefsComponent,
    RegisterComponent,
    SetupComponent,
    SidenavComponent,
    SubLevelMenuComponent,
    // TableComponent,
    TextInputComponent,
    TrendsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatSliderModule,
    ModalModule.forRoot(),
    NgApexchartsModule,
    NgbModule,
    NgSelectModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
