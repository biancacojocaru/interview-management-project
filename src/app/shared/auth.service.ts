import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  User,
} from '@angular/fire/auth';

import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();
  firebaseAuth = inject(Auth);

  constructor(private router: Router) {
    const stringUser = localStorage.getItem('user');
    this.userSubject.next(stringUser ? JSON.parse(stringUser) : null);
  }

  //login method
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(
      (res) => {
        localStorage.setItem('token', 'true');

        if (res.user.emailVerified == true) {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/dashboard']);
          this.userSubject.next(this.firebaseAuth.currentUser);
        } else {
          this.router.navigate(['/verify-email']);
        }
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
    return from(promise);
  }

  //register method
  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(
      (res) => {
        alert('Registartion Successful');
        this.router.navigate(['/verify-email']);
        sendEmailVerification(res.user);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  //logout method
  logout() {
    signOut(this.firebaseAuth).then(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        this.userSubject.next(null);
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  //forgot password method
  forgotPassword(email: string): Observable<void> {
    const promise = sendPasswordResetEmail(this.firebaseAuth, email).then(
      () => {},
      (err) => {
        alert('Something went wrong');
      }
    );
    return from(promise);
  }

  //email verification
  sendEmailForVerification(user: any) {
    user.sendEmailVerification().then(
      (res: any) => {
        this.router.navigate(['/verify-email']);
      },
      (err: any) => {
        alert('Something went wrong. Not able to send mail to your email.');
      }
    );
  }
}
