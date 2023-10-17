import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LocationDecisionsMapComponent } from './location-decisions-map/location-decisions-map.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationDecisionsMapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
