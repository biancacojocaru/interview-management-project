import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { AuthService } from './shared/auth.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenuComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public authService = inject(AuthService);

  public user$: Observable<User | null>;
  public title = 'interview-management';

  constructor() {
    this.user$ = this.authService.user$;
  }

  // ngOnInit(): void {
  //   const testCollection: CollectionReference<DocumentData> = collection(
  //     this.firestore,
  //     'test'
  //   );
  //   addDoc(testCollection, { text: 'I love firebase' });
  // }
}
