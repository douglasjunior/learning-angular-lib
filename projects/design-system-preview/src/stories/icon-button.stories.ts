import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';

import { IconButtonComponent } from '@design-system/lib';
import { AngularStory } from '../utils/storybook';

const meta: Meta<AngularStory<IconButtonComponent>> = {
  component: IconButtonComponent,
  args: {
    disabled: false,
    loading: false,
    ngContent: 'Icon Button',
    click: fn(),
  },
  render: (args) => {
    return ({
      props: args,
      template: `
    <lib-icon-button 
    [disabled]="disabled" 
    [loading]="loading"
    (click)="click($event)"
    >
      {{ ngContent }}
    </lib-icon-button>`,
    });
  },
};

export default meta;

export const Default: StoryObj<AngularStory<IconButtonComponent>> = {
};
