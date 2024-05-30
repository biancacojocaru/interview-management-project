import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'interview-management';

  constructor(private firestore: Firestore) {}

  // ngOnInit(): void {
  //   const testCollection: CollectionReference<DocumentData> = collection(
  //     this.firestore,
  //     'test'
  //   );
  //   addDoc(testCollection, { text: 'I love firebase' });
  // }
}
