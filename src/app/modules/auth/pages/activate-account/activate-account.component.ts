import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css'],
})
export class ActivateAccountComponent implements OnInit {
  activationStatus!: 'success' | 'fail' | 'inProgress';

  #route = inject(ActivatedRoute);
  #userService = inject(UserService);

  ngOnInit(): void {
    this.#route.params.subscribe(params => {
      this.activationStatus = 'inProgress';

      this.#userService.activate(params['id']).subscribe({
        next: () => (this.activationStatus = 'success'),
        error: () => (this.activationStatus = 'fail'),
      });
    });
  }
}
