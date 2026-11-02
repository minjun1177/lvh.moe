import {
    cardBox,
    image,
    leftBox,
    mainStyle,
    mainText,
    pinkText,
    redText,
} from './App.css';
import lvh from './assets/lvh.png';
import lvhText from './assets/lvh.svg';
import { HeroCarousel } from './components/heroCarousel/HeroCarousel';
import { HugCard } from './components/hugCard/HugCard';
import { Stats } from './components/stats/Stats';
import { TopBar } from './components/topbar/TopBar';
import { useCounter } from './hooks/useCounter';
import { useWebSocket } from './hooks/useWebSocket';
import { usePathname } from './lib/router';
import { GalleryPage } from './pages/GalleryPage';

function App() {
    const updateEvents = useWebSocket();
    const pathname = usePathname();

    const [pets, incPets, setPets] = useCounter('pets');
    const [hugs, incHugs, setHugs] = useCounter('hugs');
    const [cheeks, incCheeks, setCheeks] = useCounter('cheeks');

    updateEvents.on('pets', setPets);
    updateEvents.on('hugs', setHugs);
    updateEvents.on('cheeks', setCheeks);

    const statsData = [
        { name: '쓰다듬어진 횟수', value: pets + '' },
        { name: '안긴 횟수', value: hugs + '' },
        { name: '볼이 당겨진 횟수', value: cheeks + '' },
    ];

    return (
        <>
            <TopBar onCheek={incCheeks} />
            {pathname === '/gallery' ? (
                <GalleryPage />
            ) : (
                <main className={mainStyle}>
                    <div className={leftBox}>
                        <img src={lvhText} alt="LVH" />

                        <div className={mainText}>
                            {' '}
                            이곳은 <span className={pinkText}>귀여운</span>{' '}
                            LVH의 <span className={redText}>은밀한</span>{' '}
                            사이트입니다.{' '}
                        </div>

                        <div className={cardBox}>
                            <HugCard onHug={incHugs} onPet={incPets} />
                            <Stats stats={statsData} />
                        </div>
                    </div>

                    <HeroCarousel fallback={lvh} className={image} />
                </main>
            )}
        </>
    );
}

export default App;
