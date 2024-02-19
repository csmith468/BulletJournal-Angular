// @angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSliderModule } from '@angular/material/slider';
import { RouteReuseStrategy } from '@angular/router';

// other external modules
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal'
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrModule } from 'ngx-toastr';

// Routing
import { AppRoutingModule } from './app-routing.module';
import { CustomRouteReuseStrategy } from './services/component/routeReuseStategy';

// Interceptors
import { ErrorInterceptor } from './helpers/interceptors/error.interceptor';
import { JwtInterceptor } from './helpers/interceptors/jwt.interceptor';
import { LoadingInterceptor } from './helpers/interceptors/loading.interceptor';

// Components
import { AppComponent } from './app.component';
import { AboutComponent } from './components/static/about/about.component';
import { AreaChartComponent } from './components/trends/chart/area-chart/area-chart.component';
import { BodyComponent } from './components/layout/body/body.component';
import { ChartComponent } from './components/trends/chart/chart.component';
import { ChecklistsCompletedComponent } from './components/home/checklistsCompleted/checklists-completed.component';
import { ConfirmDialogComponent } from './components/layout/modals/confirm-dialog/confirm-dialog.component';
import { DropdownInputComponent } from './components/account/register/form-register-validation/dropdown-register/dropdown-register.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/account/login/login.component';
import { NotFoundComponent } from './components/static/not-found/not-found.component';
import { PreferencesComponent } from './components/account/preferences/preferences.component';
import { QuestionPrefsComponent } from './components/account/preferences/question-prefs/question-prefs.component';
import { RegisterComponent } from './components/account/register/register.component';
import { SetupComponent } from './components/account/preferences/setup/setup.component';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { SubLevelMenuComponent } from './components/layout/sidenav/sub-level-menu.component';
import { TableComponent } from './components/table/table.component';
import { TablePrefsComponent } from './components/account/preferences/table-prefs/table-prefs.component';
import { TextInputComponent } from './components/account/register/form-register-validation/text-register/text-register.component';
import { TrendsComponent } from './components/trends/trends.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AreaChartComponent,
    BodyComponent,
    ChartComponent,
    ChecklistsCompletedComponent,
    ConfirmDialogComponent,
    DropdownInputComponent,
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
    TablePrefsComponent,
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
