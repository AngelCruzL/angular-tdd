import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { authRoutes } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { AuthModule } from './auth.module';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthModule, RouterTestingModule.withRoutes(authRoutes)],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Routing', () => {
    const testCases = [
      { route: '/', component: 'login', id: 'loginForm' },
      { route: '/login', component: 'login', id: 'loginForm' },
      { route: '/signup', component: 'sign-up', id: 'signUpForm' },
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
