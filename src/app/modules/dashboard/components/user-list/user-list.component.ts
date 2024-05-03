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
  isFetching = false;

  #userService = inject(UserService);

  get hasNextPage() {
    const { page, totalPages } = this.page;
    return totalPages > page + 1;
  }

  get hasPreviousPage() {
    return this.page.page > 0;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(pageNumber: number = 0) {
    this.isFetching = true;
    this.#userService.loadUsers(pageNumber).subscribe(res => {
      this.page = res;
      this.isFetching = false;
    });
  }
}
