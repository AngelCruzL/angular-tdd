import { Component, Input } from '@angular/core';
import { User } from '@core/types/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styles: [],
})
export class UserCardComponent {
  @Input() user!: User;
}
