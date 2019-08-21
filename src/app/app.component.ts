import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseKeys } from './firebase.config';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  userDisplayName$: Observable<string>;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    if (!firebase.apps.length) {
    firebase.initializeApp(firebaseKeys);
    }
    
    // Wait to show the app.component html until a user is returned. 
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // If user is null, route guard should have redirected user to /login page,
        // but that didn't always work, so gaurding against it here, too.
        this.router.navigate(['/login']);
      } else {
        this.userDisplayName$ = of(user.displayName);     
      }
      
    });

    //}
  }
}
