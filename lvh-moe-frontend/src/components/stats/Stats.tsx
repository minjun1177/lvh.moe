import { Card } from '../card/Card';
import { boldValue, box, lightName, wrapperDiv } from './Stats.css';

export interface StatsProps {
    stats: { name: string; value: string }[];
}

export function Stats({ stats }: StatsProps) {
    return (
        <Card title="STATS">
            <div className={box}>
                {stats.map((stat) => (
                    <Stat name={stat.name} value={stat.value} />
                ))}
            </div>
        </Card>
    );
}

function Stat({ name, value }: { name: string; value: string }) {
    return (
        <div className={wrapperDiv}>
            <div className={lightName}>{name}</div>
            <div className={boldValue}>{value}</div>
        </div>
    );
}
