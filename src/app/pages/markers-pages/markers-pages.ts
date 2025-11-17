import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { v4 as UUIDv4 } from 'uuid';
import { JsonPipe } from '@angular/common';
mapboxgl.accessToken = environment.mapboxKey

interface Marcador {
  id: string,
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-pages',
  imports: [JsonPipe],
  templateUrl: './markers-pages.html',
})
export class MarkersPages implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null)
  markers = signal<Marcador[]>([]);

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;


    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-99.327571, 19.336133], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    //marcadores
    // const marker = new mapboxgl.Marker({
    //   draggable: false,
    //   color: 'red'
    // })
    // .setLngLat([-99.327571, 19.336133])
    // .addTo(map);

    // marker.on('dragend', (event) => {
    //   console.log(event);
    // })
    this.mapListeners(map)

  }
  //listeners
  mapListeners(map: mapboxgl.Map) {

    //ontap en el mapa
    map.on('click', (event) => this.mapClick(event));

    this.map.set(map);

  }

  //evento click en mapa
  mapClick(event: mapboxgl.MapMouseEvent) {

    if (!this.map()) return;

    const map = this.map()!;
    const coords = event.lngLat;
    //color dinamico
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    //marcadores
    const mapboxMarker = new mapboxgl.Marker({
      color: color
    })
      .setLngLat(coords)
      .addTo(map);

    const newMarker: Marcador = {
      id: UUIDv4(),
      mapboxMarker: mapboxMarker
    }

    // this.Marker.set([newMarker, ... this.Marker()])
    this.markers.update((markers) => [newMarker, ...markers])

    console.log(mapboxMarker);


  }

  //navegacion en marcadores

  navegacionMarcador(lngLat: LngLatLike) {
    if (!this.map()) return;
    this.map()?.flyTo({
      center: lngLat
    })
  }

  deleteMarcador(marker: Marcador) {
    if (!this.map()) return;
    const map = this.map()!;

    marker.mapboxMarker.remove();

    this.markers.set(this.markers().filter((m) => m.id !== marker.id))


  }




}
