import { Component, ElementRef, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-icon-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css'],
})
export class IconButtonComponent {
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
