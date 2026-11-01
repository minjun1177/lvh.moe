import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta = {
    component: Card,
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof meta>;
export default meta;

export const BaseCard: Story = {
    args: {
        title: 'MyCard',
        children: 'Hi',
    },
};
