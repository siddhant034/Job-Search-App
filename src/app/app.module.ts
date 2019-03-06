import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';


import { AppComponent } from './app.component';
import { JobsFetchService } from './services/jobs-fetch-service.service';
import { SearchHomeComponent } from './components/search-home/search-home.component';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchHomeComponent,
    JobsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [JobsFetchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
