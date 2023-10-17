import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import * as leaflet from 'leaflet';

@Component({
  selector: 'location-decisions-map',
  templateUrl: './location-decisions-map.component.html',
  styleUrls: ['./location-decisions-map.component.css'],
})
export class LocationDecisionsMapComponent implements AfterViewInit {
  private map!: leaflet.Map;

  constructor(private http: HttpClient) {}

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
    const apiUrl = 'http://geo-exercise.id.com.au/api/geo';

    this.http.get<{ shapes: any[] }>(apiUrl).subscribe(
      (response) => {
        const shapes = response.shapes.map((shape) => ({
          id: shape.id,
          points: this.decodePoints(shape.points),
        }));

        this.addPolygons(shapes);
      },
      (error) => {
        console.error('An error occurred retrieving the polygon data:', error);
      }
    );
  }

  private addPolygons(shapes: any[]): void {
    shapes.forEach((shape) => {
      console.log('Polygon coordinates:', shape.points);
      const polygon = leaflet
        .polygon(shape.points, {
          color: '#000000',     // black outline
          weight: 2,            // 2 pixels wide
          fillColor: '#ff0000', // red fill
          fillOpacity: 0.5      // semi-transparent
        })
        .addTo(this.map);
      polygon.bindPopup(shape.id);
    });
  }

  private decodePoints(encoded: string): leaflet.LatLng[] {
    var len = String(encoded).length;
    var index = 0;
    var ar = [];
    var lat = 0;
    var lng = 0;

    try {
      while (index < len) {
        var b;
        var shift = 0;
        var result = 0;
        do {
          b = encoded.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);

        var dlat = result & 1 ? ~(result >> 1) : result >> 1;
        lat += dlat;

        shift = 0;
        result = 0;
        do {
          b = encoded.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);

        var dlng = result & 1 ? ~(result >> 1) : result >> 1;
        lng += dlng;

        ar.push(leaflet.latLng(lng * 1e-5, lat * 1e-5));
      }
    } catch (ex) {
      //error in encoding.
    }

    return ar;
  }
}
