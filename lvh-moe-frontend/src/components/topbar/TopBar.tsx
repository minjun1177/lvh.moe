import clsx from 'clsx';
import closeLvh from '../../assets/closelvh.png';
import { usePathname } from '../../lib/router';
import { Link } from '../link/Link';
import { activeNavLink, nav, navLink, text, topBar } from './TopBar.css';

export function TopBar({ onCheek }: { onCheek: () => void }) {
    const pathname = usePathname();

    return (
        <header className={topBar}>
            <img src={closeLvh} alt="LVH closed" onClick={onCheek} />
            <Link to="/" className={text}>
                lvh.moe
            </Link>
            <nav className={nav}>
                <Link
                    to="/gallery"
                    className={clsx(
                        navLink,
                        pathname === '/gallery' && activeNavLink,
                    )}
                >
                    Gallery
                </Link>
            </nav>
        </header>
    );
}
