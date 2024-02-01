// @angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { RouteReuseStrategy } from '@angular/router';

// other external modules
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrModule } from 'ngx-toastr';

// Routing
import { AppRoutingModule } from './app-routing.module';
import { CustomRouteReuseStrategy } from './helpers/services/routeReuseStategy';

// Interceptors
import { ErrorInterceptor } from './helpers/interceptors/error.interceptor';
import { JwtInterceptor } from './helpers/interceptors/jwt.interceptor';
import { LoadingInterceptor } from './helpers/interceptors/loading.interceptor';

// Components
import { AppComponent } from './app.component';
import { AboutComponent } from './components/static/about/about.component';
import { BodyComponent } from './components/layout/body/body.component';
import { DropdownInputComponent } from './components/account/register/form-register-validation/dropdown-register/dropdown-register.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { HomeComponent } from './components/layout/home/home.component';
import { AreaChartComponent } from './components/trends/chart/area-chart/area-chart.component';
import { LoginComponent } from './components/account/login/login.component';
import { NotFoundComponent } from './components/static/not-found/not-found.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { RegisterComponent } from './components/account/register/register.component';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { SubLevelMenuComponent } from './components/layout/sidenav/sub-level-menu.component';
import { TableComponent } from './components/table/table.component';
import { TextInputComponent } from './components/account/register/form-register-validation/text-register/text-register.component';
import { TrendsComponent } from './components/trends/trends.component';
import { ChartComponent } from './components/trends/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BodyComponent,
    DropdownInputComponent,
    HeaderComponent,
    HomeComponent,
    AreaChartComponent,
    LoginComponent,
    NotFoundComponent,
    ProfileComponent,
    RegisterComponent,
    SidenavComponent,
    SubLevelMenuComponent,
    TableComponent,
    TextInputComponent,
    TrendsComponent,
    ChartComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    NgApexchartsModule,
    NgSelectModule,
    NgxSpinnerModule.forRoot({
      type: 'square-jelly-box'
    }),
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
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
