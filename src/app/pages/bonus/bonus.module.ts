// Modules 3rd party
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatInputModule, MatProgressBarModule,
  MatCardModule, MatIconModule, MatSelectModule, MatDividerModule, MatDialogModule, MatSliderModule, MatRadioModule
} from '@angular/material';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

// Components
import { BonusComponent } from './bonus.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    BonusComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatButtonModule, MatInputModule, MatProgressBarModule,
    MatCardModule, MatIconModule, MatSelectModule,
    MatRadioModule, MatDividerModule,
    FlexLayoutModule, MatDividerModule, MatDialogModule,
    MatSliderModule,
    NgxAuthFirebaseUIModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    BonusComponent
  ],
  entryComponents: [

  ]
})
export class BonusModule {
}
