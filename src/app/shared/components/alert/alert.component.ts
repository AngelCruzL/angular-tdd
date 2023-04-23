import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [],
})
export class AlertComponent {
  @Input() type: 'success' | 'danger' | 'info' = 'success';

  get alertClass(): string {
    const classList = ['alert', 'text-center'];
    classList.push(`alert-${this.type}`);

    return classList.join(' ');
  }
}
