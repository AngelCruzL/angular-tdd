import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { appRoutes } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let appComponent: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(appRoutes),
      ],
      // declarations: [AppComponent, SignUpComponent, HomeComponent],
      // imports: [
      //   RouterTestingModule.withRoutes(routes),
      //   HttpClientTestingModule,
      //   SharedModule,
      //   ReactiveFormsModule,
      // ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
    appComponent = fixture.nativeElement;
  });

  describe('Routing', () => {
    const testCases = [
      { route: '/', component: 'dashboard', id: 'dashboardPage' },
      { route: '/auth', component: 'auth', id: 'authPage' },
    ];

    testCases.forEach(({ route, component, id }) => {
      it(`should display the ${component} component on "${route}" route`, async () => {
        await router.navigate([route]);
        fixture.detectChanges();

        const page = appComponent.querySelector(`div[data-testId="${id}"]`);
        expect(page).toBeTruthy();
      });
    });
  });

  describe('Navbar Routing', function () {
    const navigationTests = [
      {
        initialPath: '/',
        clickingTo: 'Home',
        id: 'homePage',
      },
      {
        initialPath: '/auth/signup',
        clickingTo: 'Sign Up',
        id: 'signUpForm',
      },
      {
        initialPath: '/auth/login',
        clickingTo: 'Login',
        id: 'loginForm',
      },
    ];

    navigationTests.forEach(({ initialPath, clickingTo, id }) => {
      it(`should display ${clickingTo} page after clicking "${clickingTo}" link`, fakeAsync(async () => {
        await router.navigate([initialPath]);
        const linkElement = appComponent.querySelector(
          `a[title="${clickingTo}"]`
        ) as HTMLAnchorElement;
        linkElement.click();
        tick();
        fixture.detectChanges();
        const page = appComponent.querySelector(`div[data-testId="${id}"]`);
        expect(page).toBeTruthy();
      }));
    });
  });
});
