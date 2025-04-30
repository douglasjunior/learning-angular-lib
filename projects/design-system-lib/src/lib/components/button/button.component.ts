import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  constructor(private elementRef: ElementRef<HTMLButtonElement>) {
    this.elementRef.nativeElement.addEventListener('click', this.handleClick, true);
  }
  
  private handleClick = (event: MouseEvent): boolean => {
    if (this.disabled || this.loading) {
      event.stopPropagation();
      event.preventDefault();
      event.stopImmediatePropagation();
      return false;
    }
    return true;
  }
}
