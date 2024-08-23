import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';
import { SharedModule } from '@shared/shared.module';
import { UserCardComponent } from './components/user-card/user-card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    UserDetailComponent,
    UserListComponent,
    UserListItemComponent,
    UserCardComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
