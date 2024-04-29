import { setupServer } from 'msw/node';
import { HttpClientModule } from '@angular/common/http';
import { rest } from 'msw';
import { render, screen, waitFor } from '@testing-library/angular';

import { UserListComponent } from './user-list.component';
import { getPage, PageParam } from './user-list.component.spec';

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

describe('UserListComponent', () => {
  it('should display 3 users in the list', async () => {
    await render(UserListComponent, {
      imports: [HttpClientModule],
    });

    await waitFor(() => {
      expect(screen.queryAllByText(/user/).length).toBe(3);
    });
  });
});
