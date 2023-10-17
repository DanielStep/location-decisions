import { Component, AfterViewInit } from '@angular/core';
import { MapDataService } from '../map-data.service';
import { Shape } from './shape.model';
import * as leaflet from 'leaflet';

@Component({
  selector: 'location-decisions-map',
  templateUrl: './location-decisions-map.component.html',
  styleUrls: ['./location-decisions-map.component.css'],
})
export class LocationDecisionsMapComponent implements AfterViewInit {
  public map!: leaflet.Map;
  public shapes: Shape[] = [];

  constructor(
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
      (data) => {
        this.shapes = data;
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
}
