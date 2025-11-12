import { Component, inject } from '@angular/core';
import { routes } from '../../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.html',

})
export class Navbar {

  router = inject(Router)

  routes = routes.map((route) => ({
    path: route.path,
    title: `${route.title ?? 'Mapas de Angular'}`
  })).filter(route => route.path !== '**')

  /**
   * cuando veaz unavariable con un $
   * puede ser un onservable o bien un objeto de subscripcion
   * recuerda que los observables son asyncronos
   */


  pageTitle$ = this.router.events.pipe(
    // rxjs
    filter((event) => event instanceof NavigationEnd),
    tap((event) => console.log(event)),
    map((event) => event.url),
    map(url => routes.find(route => `/${route.path}` === url )?.title ?? "No hay cambios")
  );


}
