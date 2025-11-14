import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';

import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { DecimalPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;
@Component({
  selector: 'app-fullscreen-map-pages',
  imports: [DecimalPipe],
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


    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.Zoom(), // starting zoom
    });

      this.mapListeners(map)

  }

  mapListeners(map: mapboxgl.Map) {
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.Zoom.set(newZoom)
    })

    this.map.set(map)

  }


}
