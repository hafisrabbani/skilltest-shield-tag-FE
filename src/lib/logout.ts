export async function logout(token: string) {
    const res = await fetch('https://api-shieldtag.devlabs.my.id/api/v1/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Logout failed');
    }

    return true;
}
