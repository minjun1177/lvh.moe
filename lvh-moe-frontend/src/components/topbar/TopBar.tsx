import closeLvh from '../../assets/closelvh.png';
import { text, topBar } from './TopBar.css';

export function TopBar({ onCheek }: { onCheek: () => void }) {
    return (
        <header className={topBar}>
            <img src={closeLvh} alt="LVH closed" onClick={onCheek} />
            <div className={text}>lvh.moe</div>
        </header>
    );
}
