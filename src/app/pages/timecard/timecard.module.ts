// Modules 3rd party
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatInputModule, MatProgressBarModule,
  MatCardModule, MatIconModule, MatSelectModule, MatDividerModule, MatDialogModule
} from '@angular/material';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

// Components
import { TimecardComponent } from './timecard.component';
import { TimePeriodPickerComponent } from './time-period-picker/time-period-picker.component'
import { MonthlyTimecardComponent } from './monthly-timecard/monthly-timecard.component';
import { SaveTimecardComponent } from './save-timecard/save-timecard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimecardStatsComponent } from './timecard-stats/timecard-stats.component';
import { ReviewTimecardComponent } from './review-timecard/review-timecard.component';
import { ApproveTimecardComponent } from './approve-timecard/approve-timecard.component';
import { PtoComponent } from './pto/pto.component';
import { SubmitDialogComponent } from './save-timecard/submit-dialog/submit-dialog.component';
import { PoliciesDialogComponent } from './policies-dialog/policies-dialog.component';
import { FridaySaveDialogComponent } from './save-timecard/friday-save-dialog/friday-save-dialog.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    TimecardComponent,
    TimePeriodPickerComponent,
    MonthlyTimecardComponent,
    SaveTimecardComponent,
    TimecardStatsComponent,
    ApproveTimecardComponent,
    ReviewTimecardComponent,
    PtoComponent,
    SubmitDialogComponent,
    FridaySaveDialogComponent,
    PoliciesDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatButtonModule, MatInputModule, MatProgressBarModule,
    MatCardModule, MatIconModule, MatSelectModule,
    FlexLayoutModule, MatDividerModule, MatDialogModule,
    NgxAuthFirebaseUIModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    TimecardComponent
  ],
  entryComponents: [
    SubmitDialogComponent,
    PoliciesDialogComponent,
    FridaySaveDialogComponent
  ]
})
export class TimecardModule {
}
