import { Component, inject, OnInit } from '@angular/core';

import { UserService } from '@core/services/user.service';
import { UserPage } from '@core/types/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  page: UserPage = {
    content: [],
    page: 0,
    size: 3,
    totalPages: 0,
  };

  #userService = inject(UserService);

  ngOnInit(): void {
    this.#userService.loadUsers().subscribe(responseBody => {
      this.page = responseBody as UserPage;
    });
  }
}
