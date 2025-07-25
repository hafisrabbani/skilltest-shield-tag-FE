'use client';

import { useRouter } from 'next/navigation';
import { logout } from '../../lib/logout';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await logout(token);
        } catch (err) {
            console.error('Logout gagal:', err);
        }

        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
            Logout
        </button>
    );
}
