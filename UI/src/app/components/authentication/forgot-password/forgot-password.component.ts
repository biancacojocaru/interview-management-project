import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent{

  router = inject(Router);
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });
  constructor(private auth: AuthService) {}

  forgotPassword(): void {
    const rawForm = this.form.getRawValue();
    this.auth.forgotPassword(rawForm.email).subscribe(() => {
      this.router.navigateByUrl('/verify-email');
    });
  }

}
