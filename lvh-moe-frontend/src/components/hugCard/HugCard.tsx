import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { buttonBox, mainTextStyle } from './HugCard.css';

export interface HugCardProps {
    onHug?: () => void;
    onPet?: () => void;
}

export function HugCard({ onHug = () => {}, onPet = () => {} }: HugCardProps) {
    return (
        <Card title="ALERT">
            <div className={mainTextStyle}>
                LVH가 당신에게 바라는 게 있어보이네요.
            </div>
            <div className={buttonBox}>
                <Button onClick={onPet}>쓰다듬기</Button>
                <Button onClick={onHug}>안아주기</Button>
            </div>
        </Card>
    );
}
