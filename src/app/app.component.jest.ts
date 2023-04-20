import { render } from '@testing-library/angular';
import { appRoutes } from './app-routing.module';

import { AppComponent } from './app.component';

const setup = async (route: string) => {
  const { navigate } = await render(AppComponent, {
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

//    ${'/signup'}  | ${'sign-up'}     | ${'signUpForm'}
//    ${'/login'}   | ${'login'}       | ${'loginForm'}
//    ${'/'}        | ${'home'}        | ${'homePage'}
//    ${'/user/1'}  | ${'user-detail'} | ${'userDetailPage'}
//    ${'/user/13'} | ${'user-detail'} | ${'userDetailPage'}
