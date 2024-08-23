import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserListItemComponent } from './user-list-item.component';

describe('UserListItemComponent', () => {
  let component: UserListItemComponent;
  let fixture: ComponentFixture<UserListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListItemComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListItemComponent);
    component = fixture.componentInstance;
    component.user = { id: 1, username: 'user1', email: 'user1@mail.com' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an user avatar', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
  });

  it("should display the user's username", () => {
    const username = fixture.nativeElement.querySelector('span');
    expect(username.textContent).toBe('user1');
  });

  it('should have a link to user page', () => {
    const link = fixture.nativeElement.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/user/1');
  });
});
