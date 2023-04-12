import { render, screen } from '@testing-library/angular';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  describe('Layout', () => {
    test('has Sign Up header', async () => {
      await render(SignUpComponent);
      const header = screen.getByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });

    test('should display an username input', async () => {
      await render(SignUpComponent);
      const input = screen.getByLabelText('Username');
      expect(input).toBeInTheDocument();
    });

    test('should display an email input', async () => {
      await render(SignUpComponent);
      const input = screen.getByLabelText('Email');
      expect(input).toBeInTheDocument();
    });

    test('should display a password input', async () => {
      await render(SignUpComponent);
      const input = screen.getByLabelText('Password');
      expect(input).toBeInTheDocument();
      expect(input.getAttribute('type')).toBe('password');
    });

    test('should display a confirm password input', async () => {
      await render(SignUpComponent);
      const input = screen.getByLabelText('Confirm Password');
      expect(input).toBeInTheDocument();
      expect(input.getAttribute('type')).toBe('password');
    });

    test('should display a sign up button', async () => {
      await render(SignUpComponent);
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
    });

    test('should disable the sign up button initially', async () => {
      await render(SignUpComponent);
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeDisabled();
    });
  });
});
