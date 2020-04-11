import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app.routing.module';
import {LoginGuard} from './common/guard/login.guard';
import {AppComponent} from './app.component';
import {LocalStorageService} from './common/services/local-storage.service';
import {ApiService} from './common/services/api.service';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginRemindComponent } from './login-remind/login-remind.component';
import {ExampleDataService} from './common/services/example-data.service';
import {GtLoadingModule} from './common/components/gt-loading/gt-loading.module';
import {InterceptorService} from './common/services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginRemindComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GtLoadingModule,
  ],
  providers: [
    ApiService,
    LocalStorageService,
    LoginGuard,
    ExampleDataService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
