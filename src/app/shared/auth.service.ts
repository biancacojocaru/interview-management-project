import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification
} from '@angular/fire/auth';

import { Route, Router } from '@angular/router';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);

  constructor(private router: Router) {}

  //login method
  login(email: string, password: string): Observable<void> {
      const promise =  signInWithEmailAndPassword(this.firebaseAuth, email, password).then(
      res => {
        localStorage.setItem('token', 'true');

        if(res.user.emailVerified == true){
          this.router.navigate(['/dashboard']);
        }
        else{
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
      res => {
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
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  //forgot password method
  forgotPassword(email: string){
    sendPasswordResetEmail(this.firebaseAuth, email).then(
      () => {
        this.router.navigate(['/verify-email']);
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  //email verification
  sendEmailForVerification(user: any){
    user.sendEmailVerification().then(
      (res: any) => {
        this.router.navigate(['/verify-email']);
      },
      (err: any) =>{
        alert('Something went wrong. Not able to send mail to your email.');
      }
    );
  }
}
