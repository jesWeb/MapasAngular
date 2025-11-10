import { Routes } from '@angular/router';
import { FullscreenMapPages } from './pages/fullscreen-map-pages/fullscreen-map-pages';
import { MarkersPages } from './pages/markers-pages/markers-pages';
import { HousesPages } from './pages/houses-pages/houses-pages';

export const routes: Routes = [

  {
    path: 'fullScreen',
    component: FullscreenMapPages,
    title: 'FullScreen Map'
  },
  {
    path: 'markers',
    component: MarkersPages,
    title: 'Marcadores'
  },
  {
    path: 'houses',
    component: HousesPages,
    title: 'Propiedades Disponibles'
  },
  {
    path: '**',
    redirectTo: 'FullScreen Map'
  },








];
