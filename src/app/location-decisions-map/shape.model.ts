import * as leaflet from 'leaflet';

export interface Shape {
    id: string;
    points: leaflet.LatLng[];
    colour: string;
    infoBox: InfoBox;
}

export interface InfoBox {
    SA1: string;
    Number: string;
    "Percent (%)": string;
    "Total pop": string;
}