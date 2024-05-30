import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {

  email: string = "";
  
  authService = inject(AuthService);

  forgotPassword(){
    this.authService.forgotPassword(this.email);
    this.email = '';
  }

  ngOnInit(): void {}

}
