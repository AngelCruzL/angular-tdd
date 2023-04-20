import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SignUpComponent } from './sign-up.component';
import { SharedModule } from '../shared/shared.module';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [HttpClientTestingModule, SharedModule, ReactiveFormsModule],
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

    const setupForm = async () => {
      httpTestingController = TestBed.inject(HttpTestingController);

      await fixture.whenStable();
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
      email.dispatchEvent(new Event('blur'));
      password.dispatchEvent(new Event('input'));
      confirmPassword.dispatchEvent(new Event('input'));

      fixture.detectChanges();
    };

    it('should enable the sign up button when all the fields have a valid input', async () => {
      await setupForm();
      expect(button?.disabled).toBeFalsy();
    });

    it('should send the form data to backend', async () => {
      await setupForm();
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

    it('should disable the sign up button while is sending the request', async () => {
      await setupForm();
      button.click();
      fixture.detectChanges();
      button.click();
      httpTestingController.expectOne('/api/1.0/users');
      expect(button?.disabled).toBeTruthy();
    });

    it('should display a spinner after submit the form', async () => {
      await setupForm();
      expect(signUp.querySelector('span[role="status"]')).toBeFalsy();

      button.click();
      fixture.detectChanges();
      expect(signUp.querySelector('span[role="status"]')).toBeTruthy();
    });

    it('should display a notification after successful sign up', async () => {
      await setupForm();
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

    it('should hide the sign up form after successful request', async () => {
      await setupForm();
      expect(
        signUp.querySelector('div[data-testId="signUpForm"]')
      ).toBeTruthy();

      button.click();
      const req = httpTestingController.expectOne('/api/1.0/users');
      req.flush({});
      fixture.detectChanges();
      expect(signUp.querySelector('div[data-testId="signUpForm"]')).toBeFalsy();
    });

    it('should display a backed validation error message after failure form submission', async () => {
      await setupForm();

      button.click();
      const req = httpTestingController.expectOne('/api/1.0/users');
      req.flush(
        {
          validationErrors: {
            email: 'Email already in use',
          },
        },
        {
          status: 400,
          statusText: 'Bad Request',
        }
      );
      fixture.detectChanges();

      const errorMessage = signUp.querySelector(
        'div[data-testId="emailValidationError"]'
      )?.textContent;
      expect(errorMessage).toContain('Email already in use');
    });

    it('should hide the spinner after sign up failure request', async () => {
      await setupForm();

      button.click();
      const req = httpTestingController.expectOne('/api/1.0/users');
      req.flush(
        {
          validationErrors: {
            email: 'Email already in use',
          },
        },
        {
          status: 400,
          statusText: 'Bad Request',
        }
      );
      fixture.detectChanges();

      expect(signUp.querySelector('span[role="status"]')).toBeFalsy();
    });
  });

  describe('Validation', function () {
    const testCases = [
      {
        field: 'username',
        value: '',
        error: 'Username is required',
      },
      {
        field: 'username',
        value: 'abc',
        error: 'Username must be at least 4 characters long',
      },
      {
        field: 'email',
        value: '',
        error: 'Email is required',
      },
      {
        field: 'email',
        value: 'wrong-format',
        error: 'Invalid email format, please use a valid email address',
      },
      {
        field: 'password',
        value: '',
        error: 'Password is required',
      },
      {
        field: 'password',
        value: 'password',
        error:
          'Password must have at least 8 characters, one lowercase, one uppercase and one number',
      },
      {
        field: 'password',
        value: 'PASSword',
        error:
          'Password must have at least 8 characters, one lowercase, one uppercase and one number',
      },
      {
        field: 'password',
        value: 'passw0rd',
        error:
          'Password must have at least 8 characters, one lowercase, one uppercase and one number',
      },
      {
        field: 'password',
        value: 'Pass123',
        error:
          'Password must have at least 8 characters, one lowercase, one uppercase and one number',
      },
      {
        field: 'confirmPassword',
        value: 'pass',
        error:
          'Password mismatch, please make sure the password and confirm password fields have the same value',
      },
    ];

    testCases.forEach(({ field, value, error }) => {
      it(`should display "${error}" message when ${field} field has the value "${value}"`, () => {
        const signUp = fixture.nativeElement as HTMLElement;
        expect(
          signUp.querySelector(`div[data-testId="${field}ValidationError"]`)
        ).toBeNull();

        const input = signUp.querySelector(
          `input#${field}`
        ) as HTMLInputElement;
        input.value = value;
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        const validationMessage = signUp.querySelector(
          `div[data-testId="${field}ValidationError"]`
        )?.textContent;
        expect(validationMessage).toContain(error);
      });
    });

    it('should display an error message when the provided email is already register', () => {
      let httpTestingController = TestBed.inject(HttpTestingController);
      const signUp = fixture.nativeElement as HTMLElement;
      expect(
        signUp.querySelector('div[data-testId="emailValidationError"]')
      ).toBeNull();

      const emailInput = signUp.querySelector(
        'input#email'
      ) as HTMLInputElement;
      emailInput.value = 'non-unique-email@mail.com';
      emailInput.dispatchEvent(new Event('input'));
      emailInput.dispatchEvent(new Event('blur'));

      const request = httpTestingController.expectOne(
        ({ method, url, body }) => {
          if (url === '/api/1.0/user/email' && method === 'POST') {
            return body.email === 'non-unique-email@mail.com';
          }

          return false;
        }
      );
      request.flush({});
      fixture.detectChanges();

      const validationMessage = signUp.querySelector(
        'div[data-testId="emailValidationError"]'
      )?.textContent;
      const errorMessage =
        'This email is already taken, please use a different email';
      expect(validationMessage).toContain(errorMessage);
    });
  });
});
