import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [HttpClientTestingModule],
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
      expect(button?.textContent).toContain('Sign Up');
    });

    it('should disable the sign up button initially', function () {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement;
      expect(button?.disabled).toBeTruthy();
    });
  });

  describe('Interactions', function () {
    let httpTestingController: HttpTestingController;
    let signUp: HTMLElement;
    let button: HTMLButtonElement;

    const setupForm = () => {
      httpTestingController = TestBed.inject(HttpTestingController);

      signUp = fixture.nativeElement as HTMLElement;
      const username = signUp.querySelector(
        'input#username'
      ) as HTMLInputElement;
      const email = signUp.querySelector('input#email') as HTMLInputElement;
      const password = signUp.querySelector(
        'input#password'
      ) as HTMLInputElement;
      const confirmPassword = signUp.querySelector(
        'input#confirmPassword'
      ) as HTMLInputElement;
      button = signUp.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement;

      username.value = 'user1';
      email.value = 'test@mail.com';
      password.value = 'P4ssword';
      confirmPassword.value = 'P4ssword';

      username.dispatchEvent(new Event('input'));
      email.dispatchEvent(new Event('input'));
      password.dispatchEvent(new Event('input'));
      confirmPassword.dispatchEvent(new Event('input'));

      fixture.detectChanges();
    };

    it('should enable the sign up button if both password inputs have the same value', function () {
      setupForm();
      expect(button?.disabled).toBeFalsy();
    });

    it('should send the form data to backend', function () {
      setupForm();
      button.click();

      const req = httpTestingController.expectOne('/api/1.0/users');
      const { body, method } = req.request;
      expect(method).toEqual('POST');
      expect(body).toEqual({
        username: 'user1',
        email: 'test@mail.com',
        password: 'P4ssword',
      });
    });

    it('should disable the sign up button while is sending the request', function () {
      setupForm();
      button.click();
      fixture.detectChanges();
      button.click();
      httpTestingController.expectOne('/api/1.0/users');
      expect(button?.disabled).toBeTruthy();
    });

    it('should display a spinner after submit the form', function () {
      setupForm();
      expect(signUp.querySelector('span[role="status"]')).toBeFalsy();

      button.click();
      fixture.detectChanges();
      expect(signUp.querySelector('span[role="status"]')).toBeTruthy();
    });

    it('should display a notification after successful sign up', () => {
      setupForm();
      expect(signUp.querySelector('div.alert-success')).toBeFalsy();

      button.click();
      const req = httpTestingController.expectOne('/api/1.0/users');
      req.flush({});
      fixture.detectChanges();

      const message = signUp.querySelector('div.alert-success');
      expect(message?.textContent).toContain(
        'Sign up successful, please check your inbox for activation email.'
      );
    });

    it('should hide the sign up form after successful request', () => {
      setupForm();
      expect(
        signUp.querySelector('div[data-testId="signUpForm"]')
      ).toBeTruthy();

      button.click();
      const req = httpTestingController.expectOne('/api/1.0/users');
      req.flush({});
      fixture.detectChanges();
      expect(signUp.querySelector('div[data-testId="signUpForm"]')).toBeFalsy();
    });
  });
});
