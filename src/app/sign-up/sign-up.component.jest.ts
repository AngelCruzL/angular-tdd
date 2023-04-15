import { render, screen, waitFor } from '@testing-library/angular';
import { HttpClientModule } from '@angular/common/http';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { SignUpComponent } from './sign-up.component';
import { SharedModule } from '../shared/shared.module';

let requestBody: any;
let httpRequestCount = 0;

const server = setupServer(
  rest.post('/api/1.0/users', (req, res, ctx) => {
    requestBody = (req.json() as any).__zone_symbol__value;
    httpRequestCount += 1;
    return res(ctx.status(200), ctx.json({}));
  })
);

beforeEach(() => {
  httpRequestCount = 0;
});

beforeAll(() => server.listen());
afterAll(() => server.close());

const setup = async () => {
  await render(SignUpComponent, {
    imports: [HttpClientModule, SharedModule],
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
    let signUpButton: HTMLButtonElement;

    const setupForm = async () => {
      await setup();

      const usernameInput = screen.getByLabelText('Username');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText('Confirm Password');
      signUpButton = screen.getByRole('button', { name: 'Sign Up' });

      await userEvent.type(usernameInput, 'user1');
      await userEvent.type(emailInput, 'test@mail.com');
      await userEvent.type(passwordInput, 'P4ssword');
      await userEvent.type(confirmPasswordInput, 'P4ssword');
    };

    it('should enable the sign up button if both password inputs have the same value', async () => {
      await setupForm();
      expect(signUpButton).toBeEnabled();
    });

    it('should send the form data to backend', async () => {
      await setupForm();
      await userEvent.click(signUpButton);

      expect(requestBody).toEqual({
        username: 'user1',
        email: 'test@mail.com',
        password: 'P4ssword',
      });
    });

    it('should disable the sign up button while is sending the request', async () => {
      await setupForm();
      await userEvent.click(signUpButton);
      await userEvent.click(signUpButton);
      await userEvent.click(signUpButton);

      await waitFor(() => {
        expect(httpRequestCount).toBe(1);
        expect(signUpButton).toBeDisabled();
      });
    });

    test('should display a spinner after submit the form', async () => {
      await setupForm();
      expect(
        screen.queryByRole('status', { hidden: true })
      ).not.toBeInTheDocument();

      await userEvent.click(signUpButton);
      expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
    });

    it('should display a notification after successful sign up', async () => {
      await setupForm();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();

      await userEvent.click(signUpButton);
      const alert = await screen.findByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('should hide the sign up form after successful request', async () => {
      await setupForm();
      const form = screen.getByTestId('signUpForm');
      expect(form).toBeInTheDocument();

      await userEvent.click(signUpButton);
      await screen.findByRole('alert');
      expect(form).not.toBeInTheDocument();
    });
  });
});
