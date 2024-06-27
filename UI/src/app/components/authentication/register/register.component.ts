import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  router = inject(Router);
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  
  authService = inject(AuthService);

  register() {
    if (this.form.valid) {
      const rawForm = this.form.getRawValue();
      this.authService.register(rawForm.email, rawForm.password).subscribe({
        error: (err) => {
          alert('Login Error');
        },
      });
    } else {
      alert('Complete the Form');
    }
  }
}
