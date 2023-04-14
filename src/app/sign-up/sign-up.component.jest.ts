import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SignUpComponent } from './sign-up.component';
import { TestBed } from '@angular/core/testing';

const setup = async () => {
  await render(SignUpComponent, {
    imports: [HttpClientTestingModule],
  });
};

describe('SignUpComponent', () => {
  describe('Layout', () => {
    test('has Sign Up header', async () => {
      await setup();
      const header = screen.getByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });

    test('should display an username input', async () => {
      await setup();
      const input = screen.getByLabelText('Username');
      expect(input).toBeInTheDocument();
    });

    test('should display an email input', async () => {
      await setup();
      const input = screen.getByLabelText('Email');
      expect(input).toBeInTheDocument();
    });

    test('should display a password input', async () => {
      await setup();
      const input = screen.getByLabelText('Password');
      expect(input).toBeInTheDocument();
      expect(input.getAttribute('type')).toBe('password');
    });

    test('should display a confirm password input', async () => {
      await setup();
      const input = screen.getByLabelText('Confirm Password');
      expect(input).toBeInTheDocument();
      expect(input.getAttribute('type')).toBe('password');
    });

    test('should display a sign up button', async () => {
      await setup();
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
    });

    test('should disable the sign up button initially', async () => {
      await setup();
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeDisabled();
    });
  });

  describe('Interactions', function () {
    it('should enable the sign up button if both password inputs have the same value', async () => {
      await setup();
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText('Confirm Password');
      const signUpButton = screen.getByRole('button', { name: 'Sign Up' });

      await userEvent.type(passwordInput, 'P4ssword');
      await userEvent.type(confirmPasswordInput, 'P4ssword');

      expect(signUpButton).toBeEnabled();
    });

    it('should send the form data to backend', async () => {
      await setup();
      let httpTestingController = TestBed.inject(HttpTestingController);

      const usernameInput = screen.getByLabelText('Username');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText('Confirm Password');
      const signUpButton = screen.getByRole('button', { name: 'Sign Up' });

      await userEvent.type(usernameInput, 'user1');
      await userEvent.type(emailInput, 'test@mail.com');
      await userEvent.type(passwordInput, 'P4ssword');
      await userEvent.type(confirmPasswordInput, 'P4ssword');

      await userEvent.click(signUpButton);

      const req = httpTestingController.expectOne('/api/1.0/users');
      const { body, method } = req.request;
      expect(method).toEqual('POST');
      expect(body).toEqual({
        username: 'user1',
        email: 'test@mail.com',
        password: 'P4ssword',
      });
    });
  });
});
