import { render } from '@testing-library/angular';

import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard-routing.module';

const setup = async (route: string) => {
  const { navigate } = await render(DashboardComponent, {
    routes: dashboardRoutes,
  });

  await navigate(route);
};

describe('Routing', function () {
  it.each`
    route         | component        | id
    ${'/'}        | ${'home'}        | ${'homePage'}
    ${'/user/1'}  | ${'user-detail'} | ${'userDetailPage'}
    ${'/user/13'} | ${'user-detail'} | ${'userDetailPage'}
  `(
    'should display the $component component on "$route" route',
    async ({ route, id }) => {
      await setup(route);

      const page = await document.querySelector(`div[data-testId="${id}"]`);
      expect(page).toBeInTheDocument();
    }
  );
});
