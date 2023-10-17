import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import * as leaflet from 'leaflet';
import { forkJoin } from 'rxjs';

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
    const shapesApiUrl = 'http://geo-exercise.id.com.au/api/geo';
    const coloursApiUrl = 'http://geo-exercise.id.com.au/api/data';

    forkJoin({
      shapes: this.http.get<{ shapes: any[] }>(shapesApiUrl),
      colours: this.http.get<{ data: any[] }>(coloursApiUrl),
    }).subscribe(
      ({ shapes: shapesResponse, colours }) => {
        const shapes = shapesResponse.shapes.map((shape) => {
          const colourData = colours.data.find(
            (colour) => colour.GeoID === shape.id
          );
          return {
            id: shape.id,
            points: this.decodePoints(shape.points),
            colour: colourData ? colourData.color : '#FFFFFF',
            infoBox: colourData.InfoBox,
          };
        });

        this.addPolygons(shapes);
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  private addPolygons(
    shapes: {
      id: string;
      points: leaflet.LatLng[];
      colour: string;
      infoBox: any;
    }[]
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
        popup.setLatLng(e.latlng)
             .setContent(infoContent)
             .openOn(this.map);
      });

      polygon.on('mouseout', () => {
        this.map.closePopup();
      });
      
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
