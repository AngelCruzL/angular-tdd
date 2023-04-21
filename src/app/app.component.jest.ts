import { render, screen } from '@testing-library/angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import userEvent from '@testing-library/user-event';

import { appRoutes } from './app-routing.module';

import { SharedModule } from '@shared/shared.module';
import { AppComponent } from './app.component';

const setup = async (route: string) => {
  const { navigate } = await render(AppComponent, {
    imports: [HttpClientModule, SharedModule, ReactiveFormsModule],
    routes: appRoutes,
  });

  await navigate(route);
};

describe('Routing', function () {
  it.each`
    route      | component      | id
    ${'/auth'} | ${'auth'}      | ${'authPage'}
    ${'/'}     | ${'dashboard'} | ${'dashboardPage'}
  `(
    'should display the $component component on "$route" route',
    async ({ route, id }) => {
      await setup(route);

      const page = await document.querySelector(`div[data-testId="${id}"]`);
      expect(page).toBeInTheDocument();
    }
  );
});

describe('Navbar Routing', function () {
  it.each`
    initialPath       | clickingTo      | visiblePage
    ${'/'}            | ${'Ángel Cruz'} | ${'homePage'}
    ${'/auth/signup'} | ${'Sign Up'}    | ${'signUpForm'}
    ${'/auth/login'}  | ${'Login'}      | ${'loginForm'}
  `(
    'displays $visiblePage after clicking $clickingTo link',
    async ({ initialPath, clickingTo, visiblePage }) => {
      await setup(initialPath);
      const link = screen.getByRole('link', { name: clickingTo });
      await userEvent.click(link);
      const page = await screen.findByTestId(visiblePage);
      expect(page).toBeInTheDocument();
    }
  );
});
