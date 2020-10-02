// Modules 3rd party
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 404 page
import { PageNotFoundComponent } from './pages/not-found/not-found.component';

// Protected
import { AuthGuardService } from '@shared';


import { LoginComponent } from './pages/login/login.component';
import { BonusComponent } from './pages/bonus/bonus.component';
import { TimecardComponent } from './pages/timecard/timecard.component';
import { ChargeCodesComponent } from './pages/charge-codes/charge-codes.component'
import { UsersComponent } from './pages/users/users.component'
import { AuthGuard } from './auth.guard';
import { ExpenseReportsComponent } from './pages/expense-reports/expense-reports.component';


// Routing
const appRoutes: Routes = [

  // M1 pages
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'timecard', canActivate: [AuthGuard], component: TimecardComponent },
  { path: 'bonus', canActivate: [AuthGuard], component: BonusComponent },
  { path: 'chargeCodes', canActivate: [AuthGuard], component: ChargeCodesComponent },
  { path: 'expenseReports', canActivate: [AuthGuard], component: ExpenseReportsComponent },
  { path: 'users', canActivate: [AuthGuard], component: UsersComponent },



  // Protected pages
  // { path: 'profile/:uid/:name', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
