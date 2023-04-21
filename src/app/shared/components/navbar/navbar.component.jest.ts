import { render, screen } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';

const setup = async () => {
  await render(NavbarComponent, {
    imports: [RouterTestingModule],
  });
};

describe('NavbarComponent', function () {
  describe('Layout', function () {
    it.each`
      path              | title
      ${'/'}            | ${'Ángel Cruz'}
      ${'/auth/signup'} | ${'Sign Up'}
      ${'/auth/login'}  | ${'Login'}
    `(
      'should display a link with title "$title" to "$path" path',
      async ({ path, title }) => {
        await setup();

        const linkElement = screen.queryByRole('link', { name: title });
        expect(linkElement).toHaveAttribute('href', path);
      }
    );
  });
});
