import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AlertComponent } from './components/alert/alert.component';
import { ButtonComponent } from './components/button/button.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [AlertComponent, ButtonComponent, NavbarComponent],
  imports: [CommonModule, RouterLink],
  exports: [AlertComponent, ButtonComponent, NavbarComponent],
})
export class SharedModule {}
