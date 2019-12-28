// Modules 3rd party
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatProgressBarModule, MatCheckboxModule,
         MatCardModule, MatIconModule, MatAutocompleteModule, MatChipsModule, MatSelectModule } from '@angular/material';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

// Components
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    CreateUserComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, MatInputModule, MatProgressBarModule, MatCheckboxModule, 
    MatCardModule, MatIconModule, MatAutocompleteModule, MatChipsModule, 
    MatSelectModule,
    NgxAuthFirebaseUIModule
  ],
  providers: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    UsersComponent,
    CreateUserComponent
  ]
})
export class UsersModule {
}
