import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from 'design-system-lib';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'design-system-preview';

  onClick(event: MouseEvent): void {
    console.log('Button clicked!', event);
    alert('Button clicked app!');
  }
}
