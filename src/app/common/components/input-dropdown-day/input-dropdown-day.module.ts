import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDropdownDayComponent } from './input-dropdown-day.component';
import { InputDropdownDayHoverDirective } from './input-dropdown-day-hover.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [InputDropdownDayComponent, InputDropdownDayHoverDirective],
  exports: [InputDropdownDayComponent],
})
export class InputDropdownDayModule { }
