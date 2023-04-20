import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppModule } from 'src/app/app.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(routes)],
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
  });

  describe('Routing', () => {
    const testCases = [
      { route: '/', component: 'home', id: 'homePage' },
      { route: '/signup', component: 'sign-up', id: 'signUpForm' },
      { route: '/login', component: 'login', id: 'loginForm' },
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
