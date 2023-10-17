import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { MapDataService } from '../map-data.service';
import { Shape } from './shape.model';
import * as leaflet from 'leaflet';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'location-decisions-map',
  templateUrl: './location-decisions-map.component.html',
  styleUrls: ['./location-decisions-map.component.css'],
})
export class LocationDecisionsMapComponent implements AfterViewInit {
  private map!: leaflet.Map;

  constructor(
    private http: HttpClient,
    private mapDataService: MapDataService
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.fetchPolygons();
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

    tiles.addTo(this.map).setZIndex(1);
  }

  private fetchPolygons(): void {
    this.mapDataService.fetchMapData().subscribe(
      (shapes) => {
        this.addPolygons(shapes);
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  private addPolygons(
    shapes: Shape[]
  ): void {
    shapes.forEach((shape) => {
      const polygon = leaflet
        .polygon(shape.points, {
          fillColor: shape.colour,
          fillOpacity: 0.5,
          color: '#000000',
          weight: 1,
        })
        .addTo(this.map);

      const infoContent = `
        <strong>SA1:</strong> ${shape.infoBox.SA1}<br>
        <strong>Number:</strong> ${shape.infoBox.Number}<br>
        <strong>Percent (%):</strong> ${shape.infoBox['Percent (%)']}<br>
        <strong>Total pop:</strong> ${shape.infoBox['Total pop']}
      `;

      const popup = leaflet.popup({
        maxWidth: 300,
      });

      polygon.on('mouseover', (e) => {
        popup.setLatLng(e.latlng).setContent(infoContent).openOn(this.map);
      });

      polygon.on('mouseout', () => {
        this.map.closePopup();
      });
    });
  }
}
