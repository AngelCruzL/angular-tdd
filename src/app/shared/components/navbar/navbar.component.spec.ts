import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Layout', function () {
    const linkTests = [
      { path: '/', title: 'Home' },
      { path: '/auth/signup', title: 'Sign Up' },
      { path: '/auth/login', title: 'Login' },
    ];

    linkTests.forEach(({ path, title }) => {
      it(`should display a link with title "${title}" to "${path}" path`, () => {
        const linkElement = fixture.nativeElement.querySelector(
          `a[title="${title}"]`
        ) as HTMLAnchorElement;
        expect(linkElement.pathname).toEqual(path);
      });
    });
  });
});
