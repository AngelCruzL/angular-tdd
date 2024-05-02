import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';

import { UserListComponent } from './user-list.component';

export type PageParam = string | null | number;

export function getPage(page: number, size: number) {
  const start = page * size;
  const end = start + size;

  return {
    content: users.slice(start, end),
    page,
    size,
    totalPages: Math.ceil(users.length / size),
  };
}

export function parseRequestParams(request: TestRequest) {
  let size: PageParam = request.request.params.get('size');
  let page: PageParam = request.request.params.get('page');
  size = Number.isNaN(+size!) ? 5 : +size!;
  page = Number.isNaN(+page!) ? 0 : +page!;

  return { size, page };
}

const users = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@mail.com',
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@mail.com',
  },
  {
    id: 3,
    username: 'user3',
    email: 'user3@mail.com',
  },
  {
    id: 4,
    username: 'user4',
    email: 'user4@mail.com',
  },
  {
    id: 5,
    username: 'user5',
    email: 'user5@mail.com',
  },
  {
    id: 6,
    username: 'user6',
    email: 'user6@mail.com',
  },
  {
    id: 7,
    username: 'user7',
    email: 'user7@mail.com',
  },
];

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display 3 users in list', () => {
    const request = httpTestingController.expectOne(() => true);
    const { size, page } = parseRequestParams(request);
    request.flush(getPage(page, size));
    fixture.detectChanges();
    const listItems = fixture.nativeElement.querySelectorAll('li');
    expect(listItems.length).toBe(3);
  });

  it('should send the size param as 3', () => {
    const request = httpTestingController.expectOne(
      req =>
        req.url.startsWith('/api/1.0/users') && req.params.get('size') === '3'
    );
    expect(request.request.params.get('size')).toBe('3');
  });

  it('should display the "next page" button', () => {
    const request = httpTestingController.expectOne(() => true);
    request.flush(getPage(0, 3));
    fixture.detectChanges();
    const nextPageButton = fixture.nativeElement.querySelector('.next-page');
    expect(nextPageButton).toBeTruthy();
  });

  it('should request the next page after click next page button', () => {
    const request = httpTestingController.expectOne(() => true);
    request.flush(getPage(0, 3));
    fixture.detectChanges();
    const nextPageButton = fixture.nativeElement.querySelector('.next-page');
    nextPageButton.click();
    const nextPageRequest = httpTestingController.expectOne(() => true);
    expect(nextPageRequest.request.params.get('page')).toBe('1');
  });

  it('should not display the "next page" button at last page', () => {
    const request = httpTestingController.expectOne(() => true);
    request.flush(getPage(2, 3));
    fixture.detectChanges();
    const nextPageButton = fixture.nativeElement.querySelector('.next-page');
    expect(nextPageButton).toBeFalsy();
  });

  it('should not display the "previous page" button at first page', () => {
    const request = httpTestingController.expectOne(() => true);
    request.flush(getPage(0, 3));
    fixture.detectChanges();
    const previousPageButton =
      fixture.nativeElement.querySelector('.previous-page');
    expect(previousPageButton).toBeFalsy();
  });

  it('should display the "previous page" button', () => {
    const request = httpTestingController.expectOne(() => true);
    request.flush(getPage(1, 3));
    fixture.detectChanges();
    const previousPageButton =
      fixture.nativeElement.querySelector('.previous-page');
    expect(previousPageButton).toBeTruthy();
  });

  it('should request the previous page after click "previous page" button', () => {
    const request = httpTestingController.expectOne(() => true);
    request.flush(getPage(1, 3));
    fixture.detectChanges();
    const previousPageButton =
      fixture.nativeElement.querySelector('.previous-page');
    previousPageButton.click();
    const previousPageRequest = httpTestingController.expectOne(() => true);
    expect(previousPageRequest.request.params.get('page')).toBe('0');
  });
});
