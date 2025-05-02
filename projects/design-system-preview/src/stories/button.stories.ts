import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';

import { ButtonComponent } from 'design-system-lib';
import { AngularStory } from '../utils/storybook';

const meta: Meta<AngularStory<ButtonComponent>> = {
  component: ButtonComponent,
  args: {
    disabled: false,
    loading: false,
    ngContent: 'Button',
    // @ts-ignore
    handleClick: fn(),
  },
  render: (args) => {
    return ({
      props: args,
      template: `
    <lib-button 
    [disabled]="disabled" 
    [loading]="loading"
    (click)="handleClick($event)"
    >
      {{ ngContent }}
    </lib-button>`,
    });
  },
};

export default meta;

export const Default: StoryObj<AngularStory<ButtonComponent>> = {
};
