import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';

@NgModule({
  declarations: [DashboardComponent, HomeComponent, UserDetailComponent, UserListComponent, UserListItemComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
