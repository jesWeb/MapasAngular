import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';

import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { DecimalPipe, JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;
@Component({
  selector: 'app-fullscreen-map-pages',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-pages.html',
  styles: `
    div {
      width: 100vw;
      height: calc( 100vh - 64px);
    }

    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 25px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }  `
})
export class FullscreenMapPages implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null)

  //zoom
  Zoom = signal(14)
  cordenadas = signal({
    lng: -74.5,
    lat: 40
  })


  //efect
  ZoomEffect = effect(() => {

    if (!this.map()) {
      return;
    }

    this.map()?.setZoom(this.Zoom())
  })


  //afterViewInit despues de cargar
  async ngAfterViewInit() {

    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;
    console.log(element);
    const { lng, lat } = this.cordenadas()

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.Zoom(), // starting zoom
    });

    this.mapListeners(map)

  }

  //metodo de listeners para mabox
  mapListeners(map: mapboxgl.Map) {
    //zoom
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.Zoom.set(newZoom)
    })
    //punto central
    map.on('moveend', () => {
      const center = map.getCenter();
      // console.log(center);

      this.cordenadas.set(center)
    })

    //controles de mapbox
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    this.map.set(map)




  }


}
