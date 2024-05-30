import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { MenuComponent } from '../../menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ MenuComponent, RouterOutlet],
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
