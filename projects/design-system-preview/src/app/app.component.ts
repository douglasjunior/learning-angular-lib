import { Component } from '@angular/core';
import { ButtonComponent } from 'design-system-lib';

@Component({
  selector: 'app-root',
  imports: [ButtonComponent],
  template: `
    <h1>Design System Preview</h1>
    <p>
    Run <code>yarn start</code> to start the Storybook server.
    </p>
    <lib-button>Hello World</lib-button>
    `
})
export class AppComponent {
}
