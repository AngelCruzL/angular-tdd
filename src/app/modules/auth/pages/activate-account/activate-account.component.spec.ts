import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';

import { ActivateAccountComponent } from './activate-account.component';
import { RouteParams } from '@modules/auth/types';
import { AlertComponent } from '@shared/components/alert/alert.component';

describe('ActivateAccountComponent', () => {
  let component: ActivateAccountComponent;
  let fixture: ComponentFixture<ActivateAccountComponent>;
  let httpTestingController: HttpTestingController;
  let subscriber!: Subscriber<RouteParams>;

  beforeEach(async () => {
    const observable$ = new Observable<RouteParams>(sub => {
      subscriber = sub;
    });

    await TestBed.configureTestingModule({
      declarations: [ActivateAccountComponent, AlertComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: observable$,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateAccountComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should sends an account activation request', () => {
    const accountId = '123';
    subscriber.next({ id: accountId });
    const requests = httpTestingController.match(
      `/api/1.0/users/token/${accountId}`
    );
    expect(requests.length).toBe(1);
  });

  it('should display a success message if the account is activated', () => {
    const accountId = '123';
    subscriber.next({ id: accountId });
    const request = httpTestingController.expectOne(
      `/api/1.0/users/token/${accountId}`
    );

    request.flush({});
    fixture.detectChanges();
    const successMessage = fixture.nativeElement.querySelector('div.alert');
    expect(successMessage.textContent).toContain(
      'Account activated successfully'
    );
  });

  it('should display an error message if the account is not activated', () => {
    const accountId = '456';
    subscriber.next({ id: accountId });
    const request = httpTestingController.expectOne(
      `/api/1.0/users/token/${accountId}`
    );

    request.flush({}, { status: 400, statusText: 'Bad Request' });
    fixture.detectChanges();
    const successMessage = fixture.nativeElement.querySelector('div.alert');
    expect(successMessage.textContent).toContain('Account activation failed');
  });

  it('should display a spinner during activation request', () => {
    subscriber.next({ id: '123' });
    const request = httpTestingController.expectOne('/api/1.0/users/token/123');
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('span[role="status"]')
    ).toBeTruthy();

    request.flush({});
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('span[role="status"]')
    ).toBeFalsy();
  });
});
