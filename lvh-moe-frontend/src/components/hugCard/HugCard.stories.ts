import type { Meta, StoryObj } from '@storybook/react-vite';
import { HugCard } from './HugCard';

const meta = {
    component: HugCard,
} satisfies Meta<typeof HugCard>;

type Story = StoryObj<typeof meta>;
export default meta;

export const BaseCard: Story = {
    args: {},
};
