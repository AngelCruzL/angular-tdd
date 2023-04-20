import { Component, inject, OnInit } from '@angular/core';

import { NavbarService } from '@core/services/navbar.service';
import { NavbarLink } from '@core/types/navbar-link';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navbarLinks: NavbarLink[] = [];

  #navbarService = inject(NavbarService);

  ngOnInit(): void {
    this.navbarLinks = this.#navbarService.navbarLinks;
  }
}
