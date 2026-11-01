import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
    component: Button,
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {
    args: {
        children: 'Button',
    },
};
