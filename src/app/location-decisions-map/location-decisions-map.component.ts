import { Component, AfterViewInit } from '@angular/core';
import * as leaflet from 'leaflet';

@Component({
  selector: 'location-decisions-map',
  templateUrl: './location-decisions-map.component.html',
  styleUrls: ['./location-decisions-map.component.css'],
})

export class LocationDecisionsMapComponent implements AfterViewInit {

  private map!: leaflet.Map;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = leaflet.map('map', {
      center: [20, 0],
      zoom: 2
    });

    const tiles = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    tiles.addTo(this.map);
  }
}
