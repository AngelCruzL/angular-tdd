import { render, screen } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { UserListItemComponent } from './user-list-item.component';

beforeEach(async () => {
  await setup();
});

const setup = async () => {
  await render(UserListItemComponent, {
    declarations: [UserListItemComponent],
    imports: [RouterTestingModule],
    componentProperties: {
      user: {
        id: 1,
        username: 'user1',
        email: 'user1@mail.com',
      },
    },
  });
};

describe('UserListItemComponent', () => {
  it('should display an user avatar', async () => {
    const img = await screen.getByRole('img');
    expect(img).toBeTruthy();
  });

  it('should display username when user is found', async () => {
    const username = await screen.getByRole('link');
    expect(username.textContent).toBe('user1');
  });

  it('should have a link to user page', async () => {
    const link = await screen.findByRole('link');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/user/1');
  });
});
