import { Component, ElementRef, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  disabled = input(false);
  loading = input(false);
  click = output();

  constructor(private readonly elementRef: ElementRef<HTMLButtonElement>) {
    this.elementRef.nativeElement.addEventListener('click', this.handleClick, true);
  }

  private readonly handleClick = (event: MouseEvent): boolean => {
    if (this.disabled() || this.loading()) {
      event.stopPropagation();
      event.preventDefault();
      event.stopImmediatePropagation();
      return false;
    }
    return true;
  }
}
