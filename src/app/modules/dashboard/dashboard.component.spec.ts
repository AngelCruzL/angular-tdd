import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { dashboardRoutes } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(dashboardRoutes)],
      declarations: [DashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Routing', () => {
    const testCases = [
      { route: '/', component: 'home', id: 'homePage' },
      { route: '/user/1', component: 'user-detail', id: 'userDetailPage' },
      { route: '/user/13', component: 'user-detail', id: 'userDetailPage' },
    ];

    testCases.forEach(({ route, component, id }) => {
      it(`should display the ${component} component on "${route}" route`, async () => {
        await router.navigate([route]);
        fixture.detectChanges();

        const page = fixture.nativeElement.querySelector(
          `div[data-testId="${id}"]`
        );
        expect(page).toBeTruthy();
      });
    });
  });
});
