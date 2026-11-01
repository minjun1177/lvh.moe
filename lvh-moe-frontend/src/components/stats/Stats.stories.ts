import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stats } from './Stats';

const meta = {
    component: Stats,
} satisfies Meta<typeof Stats>;

type Story = StoryObj<typeof meta>;
export default meta;

export const BaseCard: Story = {
    args: {
        stats: [{ name: 'asdf', value: 'sdfgdfg' }],
    },
};
