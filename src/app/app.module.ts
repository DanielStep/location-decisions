import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LocationDecisionsMapComponent } from './location-decisions-map/location-decisions-map.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationDecisionsMapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
