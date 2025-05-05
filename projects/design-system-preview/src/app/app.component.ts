import { Component } from '@angular/core';
import { ButtonComponent, IconButtonComponent } from 'design-system-lib';

@Component({
  selector: 'app-root',
  imports: [ButtonComponent, IconButtonComponent],
  template: `
    <h1>Design System Preview</h1>
    <p>
    Run <code>yarn start</code> to start the Storybook server.
    </p>
    <lib-button>Hello World</lib-button>
    <br />
    <lib-icon-button>Hello World</lib-icon-button>
    `
})
export class AppComponent {
}
