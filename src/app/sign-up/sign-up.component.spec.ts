import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Layout', function () {
    it('has sign up header', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const h1 = signUp.querySelector('h1');
      expect(h1?.textContent).toBe('Sign Up');
    });

    it('should display an username input', function () {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="username"]');
      expect(label?.textContent).toBe('Username');
      const input = signUp.querySelector('input#username');
      expect(input).toBeTruthy();
    });

    it('should display an email input', function () {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="email"]');
      expect(label?.textContent).toBe('Email');
      const input = signUp.querySelector('input#email');
      expect(input).toBeTruthy();
    });

    it('should display a password input', function () {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="password"]');
      expect(label?.textContent).toBe('Password');
      const input = signUp.querySelector('input#password');
      expect(input).toBeTruthy();
      expect(input?.getAttribute('type')).toBe('password');
    });

    it('should display a confirm password input', function () {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="confirmPassword"]');
      expect(label?.textContent).toBe('Confirm Password');
      const input = signUp.querySelector('input#confirmPassword');
      expect(input).not.toBeNull();
      expect(input?.getAttribute('type')).toBe('password');
    });

    it('should display a sign up button', function () {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button[type="submit"]');
      expect(button?.textContent).toBe('Sign Up');
    });

    it('should disable the sign up button initially', function () {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement;
      expect(button?.disabled).toBeTruthy();
    });
  });
});
