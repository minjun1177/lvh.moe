export const basePath: string = import.meta.env.VITE_BASE_URL ?? '/api';

export interface GalleryImage {
    id: string;
    uploaded: string;
}

interface ApiResponse {
    success: boolean;
    error?: string;
}

export function imageUrl(id: string): string {
    return `${basePath}/gallery/images/${encodeURIComponent(id)}`;
}

function authHeader(password: string): HeadersInit {
    return { Authorization: `Bearer ${encodeURIComponent(password)}` };
}

async function request<T extends ApiResponse>(
    path: string,
    init?: RequestInit,
): Promise<T> {
    let res: Response;
    try {
        res = await fetch(basePath + path, init);
    } catch {
        throw new Error('서버에 연결할 수 없습니다.');
    }
    const data = (await res.json().catch(() => null)) as T | null;
    if (!res.ok || !data?.success) {
        throw new Error(data?.error ?? `요청 실패 (HTTP ${res.status})`);
    }
    return data;
}

export async function fetchGallery(): Promise<GalleryImage[]> {
    const data = await request<ApiResponse & { images: GalleryImage[] }>(
        '/gallery',
    );
    return data.images;
}

export async function fetchDailyImages(): Promise<GalleryImage[]> {
    const data = await request<ApiResponse & { images: GalleryImage[] }>(
        '/gallery/daily',
    );
    return data.images;
}

export async function checkPassword(password: string): Promise<boolean> {
    try {
        await request('/gallery/auth', {
            method: 'POST',
            headers: authHeader(password),
        });
        return true;
    } catch {
        return false;
    }
}

export async function uploadImages(
    files: File[],
    password: string,
): Promise<GalleryImage[]> {
    const form = new FormData();
    for (const file of files) form.append('files', file);
    const data = await request<ApiResponse & { images: GalleryImage[] }>(
        '/gallery/images',
        {
            method: 'POST',
            headers: authHeader(password),
            body: form,
        },
    );
    return data.images;
}

export async function deleteImage(id: string, password: string): Promise<void> {
    await request(`/gallery/images/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeader(password),
    });
}
