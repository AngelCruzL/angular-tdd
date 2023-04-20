import { Injectable } from '@angular/core';

import { NavbarLink } from '@core/types/navbar-link';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  #navbarLinks: NavbarLink[] = [
    {
      label: 'Sign Up',
      path: '/auth/signup',
    },
    {
      label: 'Login',
      path: '/auth/login',
    },
  ];
  get navbarLinks(): NavbarLink[] {
    return this.#navbarLinks;
  }
}
