// Modules 3rd party
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule, MatSnackBarModule,
  MatToolbarModule, MatDialogModule, MatSidenavModule, MatNativeDateModule,
  MatCardModule, MatTabsModule, MatIconModule, MatSelectModule, MatSlideToggleModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

// Modules
import { BonusModule } from './pages/bonus/bonus.module';
import { LoginModule } from './pages/login/login.module';
import { TimecardModule } from './pages/timecard/timecard.module';
import { ChargeCodesModule } from './pages/charge-codes/charge-codes.module';
import { UsersModule } from './pages/users/users.module';

import { PipesModule } from '@shared/pipes/pipes.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';

// Shared
import {
  AdminComponent,
  HeaderComponent,
  UserService,
  AlertService,
  AuthGuardService,
  AuthService,
  DateService,
  WindowService
} from '@shared';

// Main
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { firebaseKeys } from './firebase.config';

// Pages
import { PageNotFoundComponent } from './pages/not-found/not-found.component';
import { ExpenseReportModule } from './pages/expense-reports/expense-reports.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule, MatSnackBarModule,
    MatToolbarModule, MatDialogModule, MatSidenavModule, MatNativeDateModule, MatSelectModule,
    MatCardModule, MatTabsModule, MatIconModule, MatSlideToggleModule, MatTooltipModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    PipesModule,
    BonusModule,
    LoginModule,
    TimecardModule,
    ChargeCodesModule,
    ExpenseReportModule,
    UsersModule,
    NgxAuthFirebaseUIModule.forRoot(firebaseKeys),
    AngularFireModule.initializeApp(firebaseKeys),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireDatabaseModule
  ],
  providers: [
    UserService,
    AlertService,
    AuthGuardService,
    AuthService,
    DateService,
    WindowService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
