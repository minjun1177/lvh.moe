import { useEffect, useState } from 'react';

const basePath = import.meta.env.VITE_BASE_URL ?? '/api';

async function getValue(name: string) {
    const res = await fetch(basePath + '/value/' + name);
    const data = await res.json();

    if (data?.success) {
        return data.value;
    } else {
        console.error(data);
        return 0;
    }
}

async function incRun(name: string) {
    await fetch(basePath + '/inc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    }).catch(console.error);
}

export function useCounter(
    name: string,
): [number, () => void, (value: number) => void] {
    const [value, setValue] = useState(0);

    useEffect(() => {
        getValue(name).then((value) => setValue(value));
    }, []);

    function inc() {
        setValue(value + 1);
        incRun(name);
    }

    return [value, inc, setValue];
}
