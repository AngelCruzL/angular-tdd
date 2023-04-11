// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { SignUpComponent } from './sign-up.component';
//
// describe('SignUpComponent', () => {
//   let component: SignUpComponent;
//   let fixture: ComponentFixture<SignUpComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [SignUpComponent],
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(SignUpComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('has sign up header', () => {
//     const signUp = fixture.nativeElement as HTMLElement;
//     const h1 = signUp.querySelector('h1');
//     expect(h1?.textContent).toBe('Sign Up');
//   });
// });

import { render, screen } from '@testing-library/angular';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  it('has Sign Up header', async () => {
    await render(SignUpComponent);
    const header = screen.getByRole('heading', { name: 'Sign Up' });
    expect(header).toBeTruthy();
  });
});
