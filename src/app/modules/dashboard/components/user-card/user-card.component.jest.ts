import { render, screen } from '@testing-library/angular';

import { UserCardComponent } from './user-card.component';

beforeEach(async () => {
  await setup();
});

const setup = async () => {
  await render(UserCardComponent, {
    declarations: [UserCardComponent],
    componentProperties: {
      user: {
        id: 1,
        username: 'user1',
        email: 'user1@mail.com',
      },
    },
  });
};

describe('UserCardComponent', () => {
  it('should display an user avatar', async () => {
    const img = await screen.findByRole('img');
    expect(img).toBeTruthy();
  });

  it('should display username when user is found', async () => {
    const username = await screen.findByRole('heading');
    expect(username.textContent).toBe('user1');
  });
});
