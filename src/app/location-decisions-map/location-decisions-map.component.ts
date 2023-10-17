import { Component, AfterViewInit } from '@angular/core';
import * as leaflet from 'leaflet';

@Component({
  selector: 'location-decisions-map',
  templateUrl: './location-decisions-map.component.html',
  styleUrls: ['./location-decisions-map.component.css'],
})
export class LocationDecisionsMapComponent implements AfterViewInit {
  private map!: leaflet.Map;

  // Sample data
  private polygonsData = [
    {
      name: 'Polygon 1',
      coordinates: [
        { lat: -37.7950, lng: 144.9834 },
        { lat: -37.7950, lng: 144.9934 },
        { lat: -37.8100, lng: 144.9934 },
        { lat: -37.8100, lng: 144.9834 }
      ],
    },
    // ... other polygons
  ];

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
    this.addPolygons();
  }

  private initMap(): void {
    this.map = leaflet.map('map', {
      center: [-37.8136, 144.9631],
      zoom: 12,
    });

    const tiles = leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    tiles.addTo(this.map);
  }

  private addPolygons(): void {
    this.polygonsData.forEach(polygonData => {
      const latLngs = polygonData.coordinates.map(coord => new leaflet.LatLng(coord.lat, coord.lng));
      const polygon = leaflet.polygon(latLngs).addTo(this.map);
      polygon.bindPopup(polygonData.name);
    });
  }
  
}
