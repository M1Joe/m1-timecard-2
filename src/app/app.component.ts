import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseKeys } from './firebase.config';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  userDisplayName$: Observable<string>;

  public ngOnInit(): void {
    if (!firebase.apps.length) {
    firebase.initializeApp(firebaseKeys);
    }
    
    // Wait to show the app.component html until a user is returned. 
    // If user is null, route guard will redirect user to log in page.
    firebase.auth().onAuthStateChanged((user) => {
      this.userDisplayName$ = of(user.displayName);     
    });

    //}
  }
}
