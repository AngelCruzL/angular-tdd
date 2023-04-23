import { render } from '@testing-library/angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';
import { authRoutes } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const setup = async (route: string) => {
  const { navigate } = await render(AuthComponent, {
    declarations: [LoginComponent, SignUpComponent],
    imports: [HttpClientModule, SharedModule, ReactiveFormsModule],
    routes: authRoutes,
  });

  await navigate(route);
};

const server = setupServer(
  rest.post('/api/1.0/users/token/:token', (req, res, ctx) => {
    if (req.params['token'] === '456')
      return res(ctx.status(400), ctx.json({}));

    return res(ctx.status(200));
  })
);

beforeEach(() => {
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('Routing', function () {
  it.each`
    route              | component             | id
    ${'/'}             | ${'login'}            | ${'loginForm'}
    ${'/login'}        | ${'login'}            | ${'loginForm'}
    ${'/signup'}       | ${'sign-up'}          | ${'signUpForm'}
    ${'/activate/123'} | ${'activate-account'} | ${'activateAccountPage'}
    ${'/activate/13'}  | ${'activate-account'} | ${'activateAccountPage'}
  `(
    'should display the $component component on "$route" route',
    async ({ route, id }) => {
      await setup(route);

      const page = await document.querySelector(`div[data-testId="${id}"]`);
      expect(page).toBeInTheDocument();
    }
  );
});
