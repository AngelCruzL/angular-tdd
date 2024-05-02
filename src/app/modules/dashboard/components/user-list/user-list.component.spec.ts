import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserListComponent } from './user-list.component';
import {
  getPage,
  parseRequestParams,
} from '@shared/utils/data/mock/users.mock';

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
