import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  authService = inject(AuthService);

  register(){
    this.authService.logout();
  }

  ngOnInit(): void {}
}
