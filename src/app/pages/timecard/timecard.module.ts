// Modules 3rd party
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatProgressBarModule, 
         MatCardModule, MatIconModule, MatSelectModule } from '@angular/material';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

// Components
import { TimecardComponent } from './timecard.component';
import { TimePeriodPickerComponent } from '../../components/time-period-picker/time-period-picker.component'

@NgModule({
  declarations: [
    TimecardComponent,
    TimePeriodPickerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatButtonModule, MatInputModule, MatProgressBarModule,
    MatCardModule, MatIconModule, MatSelectModule,
    NgxAuthFirebaseUIModule
  ],
  providers: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    TimecardComponent
  ]
})
export class TimecardModule {
}
