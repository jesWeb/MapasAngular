import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { EnvironmentInjector } from '@angular/core';
mapboxgl.accessToken = 'environment.mapboxKey';
@Component({
  selector: 'app-fullscreen-map-pages',
  imports: [],
  templateUrl: './fullscreen-map-pages.html',
  styles: `
  div{
    width:100vw;
    height:calc( 100vh - 64px);
  }
  `,
})
export class FullscreenMapPages implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');


  //afterViewInit despues de cargar
  async ngAfterViewInit() {

    if (!this.divElement) return;

    await new Promise((resolve) =>setTimeout(resolve,80));

    const element = this.divElement()!.nativeElement;
    console.log(element);


    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });



  }

}
