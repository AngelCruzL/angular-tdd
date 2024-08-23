import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';

import { AlertComponent } from '@shared/components/alert/alert.component';
import { RouteParams } from '@modules/auth/types';
import { UserDetailComponent } from './user-detail.component';
import { UserCardComponent } from '@modules/dashboard/components/user-card/user-card.component';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let httpTestingController: HttpTestingController;
  let subscriber!: Subscriber<RouteParams>;

  beforeEach(async () => {
    const observable$ = new Observable<RouteParams>(sub => {
      subscriber = sub;
    });

    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent, AlertComponent, UserCardComponent],
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

    fixture = TestBed.createComponent(UserDetailComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should sends request to get user data', () => {
    const accountId = '1';
    subscriber.next({ id: accountId });
    const requests = httpTestingController.match(`/api/1.0/users/${accountId}`);
    expect(requests.length).toBe(1);
  });

  it('should display username when user is found', () => {
    const accountId = '1';
    subscriber.next({ id: accountId });
    const request = httpTestingController.expectOne(
      `/api/1.0/users/${accountId}`
    );

    request.flush({
      id: accountId,
      username: 'user1',
      email: 'user1@mail.com',
    });
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('h3');
    expect(header.textContent).toContain('user1');
  });

  it('should display an error when user is not found', () => {
    const accountId = '2';
    subscriber.next({ id: accountId });
    const request = httpTestingController.expectOne(
      `/api/1.0/users/${accountId}`
    );

    request.flush(
      { message: 'User not found' },
      { status: 404, statusText: 'Not found' }
    );
    fixture.detectChanges();
    const successMessage = fixture.nativeElement.querySelector('div.alert');
    expect(successMessage.textContent).toContain('User not found');
  });

  it('should display a spinner during user get request', () => {
    subscriber.next({ id: '1' });
    const request = httpTestingController.expectOne('/api/1.0/users/1');
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('span[role="status"]')
    ).toBeTruthy();

    request.flush({
      id: '1',
      username: 'user1',
      email: 'user1@mail.com',
    });
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('span[role="status"]')
    ).toBeFalsy();
  });
});
