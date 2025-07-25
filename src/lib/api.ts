const BASE_URL = 'https://api-shieldtag.devlabs.my.id/api/v1';

export async function fetcher<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'API Error');
    }

    return res.json().then((response) => response.data as T);
}
