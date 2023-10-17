import { Component, Input } from '@angular/core';
import { Shape } from '../location-decisions-map/shape.model';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-polygons',
  template: '',
  styleUrls: ['./polygons.component.css']
})
export class PolygonsComponent {
  @Input() map!: leaflet.Map;
  @Input() set shapes(data: Shape[]) {
    if (data) {
      this.addPolygons(data);
    }
  }

  private addPolygons(shapes: Shape[]): void {
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
