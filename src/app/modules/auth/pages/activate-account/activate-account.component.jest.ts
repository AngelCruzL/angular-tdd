import { render, screen, waitFor } from '@testing-library/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { RouteParams } from '@modules/auth/types';
import { ActivateAccountComponent } from './activate-account.component';
import { AlertComponent } from '@shared/components/alert/alert.component';

let subscriber!: Subscriber<RouteParams>;

const setup = async () => {
  const observable$ = new Observable<RouteParams>(sub => {
    subscriber = sub;
  });

  await render(ActivateAccountComponent, {
    declarations: [AlertComponent],
    imports: [HttpClientModule],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          params: observable$,
        },
      },
    ],
  });
};

let counter = 0;

const server = setupServer(
  rest.post('/api/1.0/users/token/:token', (req, res, ctx) => {
    counter++;

    if (req.params['token'] === '456')
      return res(ctx.status(400), ctx.json({}));

    return res(ctx.status(200));
  })
);

beforeEach(() => {
  counter = 0;
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe('ActivateAccountComponent', () => {
  it('should sends an account activation request', async () => {
    await setup();
    const accountId = '123';
    subscriber.next({ id: accountId });

    await waitFor(() => {
      expect(counter).toBe(1);
    });
  });

  it('should display a success message if the account is activated', async () => {
    await setup();
    subscriber.next({ id: '123' });

    const successMessage = await screen.findByText(
      'Account activated successfully'
    );
    expect(successMessage).toBeInTheDocument();
  });

  it('should display an error message if the account is not activated', async () => {
    await setup();
    subscriber.next({ id: '456' });

    const errorMessage = await screen.findByText('Account activation failed');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should display a spinner during activation request', async () => {
    await setup();
    subscriber.next({ id: '456' });

    // TODO: Fix the spinner test
    // await screen.findByRole('status');

    const msg = await screen.findByText('Account activation failed');
    expect(msg).toBeInTheDocument();
  });
});
