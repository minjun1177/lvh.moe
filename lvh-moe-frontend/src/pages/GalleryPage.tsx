import { useCallback, useEffect, useRef, useState } from 'react';
import { primaryButton } from '../components/button/Button.css';
import { Card } from '../components/card/Card';
import {
    checkPassword,
    deleteImage,
    fetchGallery,
    imageUrl,
    uploadImages,
    type GalleryImage,
} from '../lib/api';
import {
    adminRow,
    closeButton,
    deleteButton,
    emptyText,
    grid,
    header,
    input,
    lightbox,
    lightboxImage,
    lightboxNav,
    lightboxNext,
    lightboxPrev,
    page,
    statusText,
    thumb,
    thumbButton,
    thumbImage,
    title,
} from './GalleryPage.css';

const PASSWORD_KEY = 'lvh-gallery-password';

function loadStoredPassword(): string {
    try {
        return sessionStorage.getItem(PASSWORD_KEY) ?? '';
    } catch {
        return '';
    }
}

function storePassword(value: string | null) {
    try {
        if (value) sessionStorage.setItem(PASSWORD_KEY, value);
        else sessionStorage.removeItem(PASSWORD_KEY);
    } catch {
        // storage unavailable (private mode etc.); login just won't persist
    }
}

export function GalleryPage() {
    const [images, setImages] = useState<GalleryImage[] | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [selected, setSelected] = useState<number | null>(null);

    const [password, setPassword] = useState('');
    const [authed, setAuthed] = useState(false);
    const [status, setStatus] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const fileInput = useRef<HTMLInputElement>(null);

    const reload = useCallback(async () => {
        try {
            setImages(await fetchGallery());
            setLoadError(null);
        } catch (err) {
            setLoadError(err instanceof Error ? err.message : String(err));
        }
    }, []);

    useEffect(() => {
        reload();
        const stored = loadStoredPassword();
        if (stored) {
            checkPassword(stored).then((ok) => {
                if (ok) {
                    setPassword(stored);
                    setAuthed(true);
                } else {
                    storePassword(null);
                }
            });
        }
    }, [reload]);

    async function login() {
        setBusy(true);
        const ok = await checkPassword(password);
        setBusy(false);
        if (ok) {
            storePassword(password);
            setAuthed(true);
            setStatus(null);
        } else {
            setStatus('비밀번호가 틀렸습니다.');
        }
    }

    function logout() {
        storePassword(null);
        setAuthed(false);
        setPassword('');
    }

    async function upload() {
        const files = Array.from(fileInput.current?.files ?? []);
        if (files.length === 0) {
            setStatus('업로드할 이미지를 선택하세요.');
            return;
        }
        setBusy(true);
        setStatus(`${files.length}장 업로드 중...`);
        try {
            const uploaded = await uploadImages(files, password);
            setStatus(`${uploaded.length}장 업로드 완료.`);
            if (fileInput.current) fileInput.current.value = '';
            await reload();
        } catch (err) {
            setStatus(
                `업로드 실패: ${err instanceof Error ? err.message : String(err)}`,
            );
        } finally {
            setBusy(false);
        }
    }

    async function remove(id: string) {
        if (!window.confirm('이 이미지를 삭제할까요?')) return;
        try {
            await deleteImage(id, password);
            setSelected(null);
            await reload();
        } catch (err) {
            setStatus(
                `삭제 실패: ${err instanceof Error ? err.message : String(err)}`,
            );
        }
    }

    const count = images?.length ?? 0;
    const move = useCallback(
        (delta: number) =>
            setSelected((i) =>
                i === null || count === 0 ? i : (i + delta + count) % count,
            ),
        [count],
    );

    // Keyboard controls while the lightbox is open.
    useEffect(() => {
        if (selected === null) return;
        function onKey(event: KeyboardEvent) {
            if (event.key === 'Escape') setSelected(null);
            else if (event.key === 'ArrowLeft') move(-1);
            else if (event.key === 'ArrowRight') move(1);
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [selected, move]);

    const current = selected !== null && images ? images[selected] : null;

    return (
        <main className={page}>
            <div className={header}>
                <h1 className={title}>Gallery</h1>
                <span>{images ? `${count}장` : ''}</span>
            </div>

            <Card title={authed ? 'UPLOAD' : 'ADMIN'}>
                {authed ? (
                    <div className={adminRow}>
                        <input
                            ref={fileInput}
                            className={input}
                            type="file"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            multiple
                            disabled={busy}
                        />
                        <button
                            type="button"
                            className={primaryButton}
                            onClick={upload}
                            disabled={busy}
                        >
                            업로드
                        </button>
                        <button
                            type="button"
                            className={primaryButton}
                            onClick={logout}
                            disabled={busy}
                        >
                            로그아웃
                        </button>
                    </div>
                ) : (
                    <form
                        className={adminRow}
                        onSubmit={(event) => {
                            event.preventDefault();
                            login();
                        }}
                    >
                        <input
                            className={input}
                            type="password"
                            placeholder="업로드 비밀번호"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            autoComplete="current-password"
                        />
                        <button
                            type="submit"
                            className={primaryButton}
                            disabled={busy || !password}
                        >
                            로그인
                        </button>
                    </form>
                )}
                {status && <div className={statusText}>{status}</div>}
            </Card>

            {loadError && (
                <div className={emptyText}>
                    갤러리를 불러오지 못했습니다: {loadError}
                </div>
            )}
            {images && images.length === 0 && (
                <div className={emptyText}>아직 이미지가 없습니다.</div>
            )}

            <div className={grid}>
                {images?.map((image, i) => (
                    <div key={image.id} className={thumb}>
                        <button
                            type="button"
                            className={thumbButton}
                            onClick={() => setSelected(i)}
                        >
                            <img
                                className={thumbImage}
                                src={imageUrl(image.id)}
                                alt={`갤러리 이미지 ${i + 1}`}
                                loading="lazy"
                            />
                        </button>
                        {authed && (
                            <button
                                type="button"
                                className={deleteButton}
                                onClick={() => remove(image.id)}
                                aria-label="삭제"
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {current && (
                <div
                    className={lightbox}
                    onClick={() => setSelected(null)}
                    role="dialog"
                    aria-modal="true"
                >
                    <img
                        className={lightboxImage}
                        src={imageUrl(current.id)}
                        alt={`갤러리 이미지 ${(selected ?? 0) + 1}`}
                        onClick={(event) => event.stopPropagation()}
                    />
                    {count > 1 && (
                        <>
                            <button
                                type="button"
                                className={`${lightboxNav} ${lightboxPrev}`}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    move(-1);
                                }}
                                aria-label="이전 이미지"
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                className={`${lightboxNav} ${lightboxNext}`}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    move(1);
                                }}
                                aria-label="다음 이미지"
                            >
                                ›
                            </button>
                        </>
                    )}
                    <button
                        type="button"
                        className={closeButton}
                        onClick={() => setSelected(null)}
                        aria-label="닫기"
                    >
                        ×
                    </button>
                </div>
            )}
        </main>
    );
}
