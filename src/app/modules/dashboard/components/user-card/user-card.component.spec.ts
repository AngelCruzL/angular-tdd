import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    component.user = {
      id: 1,
      username: 'user1',
      email: 'user1@mail.com',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an user avatar', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
  });

  it('should display username when user is found', () => {
    const username = fixture.nativeElement.querySelector('h3');
    expect(username.textContent).toBe('user1');
  });
});
