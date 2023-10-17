import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { decodePoints } from './location-decisions-map/map-utils';
import { Shape } from './location-decisions-map/shape.model';
import * as leaflet from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapDataService {
  private shapesApiUrl = 'http://geo-exercise.id.com.au/api/geo';
  private coloursApiUrl = 'http://geo-exercise.id.com.au/api/data';

  constructor(private http: HttpClient) {}

  fetchMapData(): Observable<Shape[]> {
    return forkJoin({
      shapes: this.http.get<{ shapes: any[] }>(this.shapesApiUrl),
      colours: this.http.get<{ data: any[] }>(this.coloursApiUrl),
    }).pipe(
      map(({ shapes: shapesResponse, colours }) => {
        return shapesResponse.shapes.map((shape) => {
          const colourData = colours.data.find(
            (colour) => colour.GeoID === shape.id
          );
          return {
            id: shape.id,
            points: decodePoints(shape.points),
            colour: colourData ? colourData.color : '#FFFFFF',
            infoBox: colourData.InfoBox,
          };
        });
      })
    );
  }
}
