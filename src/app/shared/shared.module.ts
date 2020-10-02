// Modules 3rd party
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AutofocusDirective } from 'src/app/directives/autofocus.directive';

@NgModule({
  declarations: [
    AutofocusDirective,
  ],
  exports: [
    AutofocusDirective
  ]
})
export class SharedModule {
}
