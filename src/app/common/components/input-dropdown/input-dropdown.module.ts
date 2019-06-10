import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDropdownComponent } from './input-dropdown.component';
import { InputDropdownHoverDirective } from './input-dropdown-hover.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [InputDropdownComponent, InputDropdownHoverDirective],
  exports: [InputDropdownComponent],
})
export class InputDropdownModule { }
