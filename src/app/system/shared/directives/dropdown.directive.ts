import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[vpDropdown]'
})
export class DropdownDirective {

  constructor() { }

  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toogleClick() {
    this.isOpen = !this.isOpen;
  }
}
