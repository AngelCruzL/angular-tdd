import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { User } from '@core/types/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user!: User;
  status!: 'success' | 'fail' | 'inProgress';

  #route = inject(ActivatedRoute);
  #userService = inject(UserService);

  ngOnInit(): void {
    this.#route.params.subscribe(params => {
      this.status = 'inProgress';
      this.#userService.getUserById(params['id']).subscribe({
        next: user => {
          this.user = user;
          this.status = 'success';
        },
        error: () => (this.status = 'fail'),
      });
    });
  }
}
