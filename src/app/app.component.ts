import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase/app';
import { firebaseKeys } from './firebase.config';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './shared';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { fadeAnimation, dropToolbar } from '@shared/animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation, dropToolbar] // register the animation
})

export class AppComponent implements OnInit {

  userDisplayName$: Observable<string>;
  isLoginPage: boolean;
  browserSupported = true;

  constructor(private router: Router, private authService: AuthService, private afAuth: AngularFireAuth) { }

  public ngOnInit(): void {

    this.browserSupported = this.getBrowserSupported();

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseKeys);
    }

    this.afAuth.authState.pipe(take(1)).subscribe(user => {
      if (user) {
        this.userDisplayName$ = of(user.displayName);
      } else {
        this.router.navigate(['/login']);
        this.isLoginPage = true;
      }
    });
  }

  getBrowserSupported(): boolean {
    var ua = navigator.userAgent;
    var isInternetExplorer = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return !isInternetExplorer;
  }




}
