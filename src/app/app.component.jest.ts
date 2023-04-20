import { render } from '@testing-library/angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { routes } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const setup = async (route: string) => {
  const { navigate } = await render(AppComponent, {
    declarations: [SignUpComponent, HomeComponent],
    imports: [HttpClientModule, SharedModule, ReactiveFormsModule],
    routes,
  });

  await navigate(route);
};

describe('Routing', function () {
  it.each`
    route         | component        | id
    ${'/'}        | ${'home'}        | ${'homePage'}
    ${'/signup'}  | ${'sign-up'}     | ${'signUpForm'}
    ${'/login'}   | ${'login'}       | ${'loginForm'}
    ${'/user/1'}  | ${'user-detail'} | ${'userDetailPage'}
    ${'/user/13'} | ${'user-detail'} | ${'userDetailPage'}
  `(
    'should display the $component component on "$route" route',
    async ({ route, id }) => {
      await setup(route);

      const page = document.querySelector(`div[data-testId="${id}"]`);
      expect(page).toBeInTheDocument();
    }
  );
});
