import { setupServer } from 'msw/node';
import { HttpClientModule } from '@angular/common/http';
import { rest } from 'msw';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { UserListComponent } from './user-list.component';
import { getPage, PageParam } from '@shared/utils/data/mock/users.mock';

const server = setupServer(
  rest.get('/api/1.0/users', (req, res, ctx) => {
    let size: PageParam = req.url.searchParams.get('size');
    let page: PageParam = req.url.searchParams.get('page');
    size = Number.isNaN(+size!) ? 5 : +size!;
    page = Number.isNaN(+page!) ? 0 : +page!;
    return res(ctx.status(200), ctx.json(getPage(page, size)));
  })
);

beforeEach(() => server.resetHandlers());

beforeAll(() => server.listen());

afterAll(() => server.close());

const setup = async () => {
  await render(UserListComponent, {
    imports: [HttpClientModule],
  });
};

describe('UserListComponent', () => {
  it('should display 3 users in the list', async () => {
    await setup();

    await waitFor(() => {
      expect(screen.queryAllByText(/user/).length).toBe(3);
    });
  });

  it('should display the "next page" button', async () => {
    await setup();

    await screen.findByText('user1');
    expect(screen.getByText('Next >')).toBeInTheDocument();
  });

  it('should request the next page after click next page button', async () => {
    await setup();

    await screen.findByText('user1');
    await userEvent.click(screen.getByText('Next >'));
    const firstUserOnNextPage = await screen.findByText('user4');
    expect(firstUserOnNextPage).toBeTruthy();
  });

  it('should not display the "next page" button at last page', async () => {
    await setup();

    await screen.findByText('user1');
    await userEvent.click(screen.getByText('Next >'));
    await screen.findByText('user4');
    await userEvent.click(screen.getByText('Next >'));
    await screen.findByText('user7');
    expect(screen.queryByText('Next >')).toBeFalsy();
  });

  it('should not display the "previous page" button at first page', async () => {
    await setup();

    expect(screen.queryByText('< Previous')).not.toBeInTheDocument();
  });

  it('should display the "previous page" button in page 2', async () => {
    await setup();

    await screen.findByText('user1');
    await userEvent.click(screen.getByText('Next >'));
    await screen.findByText('user4');
    expect(screen.getByText('< Previous')).toBeInTheDocument();
  });

  it('should request the previous page after click "previous page" button', async () => {
    await setup();

    await screen.findByText('user1');
    await userEvent.click(screen.getByText('Next >'));
    await screen.findByText('user4');
    await userEvent.click(screen.getByText('< Previous'));
    const firstUserOnPreviousPage = await screen.findByText('user1');
    expect(firstUserOnPreviousPage).toBeTruthy();
  });
});
