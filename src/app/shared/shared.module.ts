import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './components/alert/alert.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [AlertComponent, ButtonComponent],
  imports: [CommonModule],
  exports: [AlertComponent, ButtonComponent],
})
export class SharedModule {}
