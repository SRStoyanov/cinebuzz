import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-test-firebase',
  templateUrl: './test-firebase.component.html',
  styleUrls: ['./test-firebase.component.css'],
})
export class TestFirebaseComponent implements OnInit {
  reviews: Observable<any[]> = of([]);

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.reviews = this.firestore.collection('reviews').valueChanges();
  }
}
