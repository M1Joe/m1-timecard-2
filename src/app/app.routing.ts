// Modules 3rd party
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 404 page
import { PageNotFoundComponent } from './pages/not-found/not-found.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ContactComponent } from './pages/contact/contact.component';

import { AuthComponent } from './pages/auth/auth.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileSettingsComponent } from './pages/profile/profile-settings.component';

// Components
import { MiscComponent } from './components/misc/misc.component';

// Protected
import { AuthGuardService } from '@shared';


import { LoginComponent } from './pages/login/login.component';
import { TimecardComponent } from './pages/timecard/timecard.component';
import { ChargeCodesComponent } from './pages/charge-codes/charge-codes.component'
import { UsersComponent } from './pages/users/users.component'
import { AuthGuard } from './auth.guard';


// Routing
const appRoutes: Routes = [

  // M1 pages
  { path: '', redirectTo: '/login', pathMatch : 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'timecard', canActivate : [AuthGuard], component: TimecardComponent },
  { path: 'chargeCodes', canActivate : [AuthGuard], component: ChargeCodesComponent },
  { path: 'users', canActivate : [AuthGuard], component: UsersComponent },

  // Public pages
  //{ path: '', redirectTo: '/home', pathMatch : 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutMeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'misc', component: MiscComponent },
  { path: 'auth', component: AuthComponent },

  // Protected pages
  // { path: 'profile/:uid/:name', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'profile-settings', component: ProfileSettingsComponent, canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
