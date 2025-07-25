'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetcher } from '../../lib/api';
import ButtonLogout from './ButtonLogout';
import Link from "next/link";
type User = {
    id: number;
    email: string;
};

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await fetcher<User>('/user', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(res);
            } catch (err) {
                console.error('Gagal fetch user:', err);
                localStorage.removeItem('token');
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Memuat data pengguna...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-6 text-zinc-900">Selamat Datang 🎉</h1>
                {user ? (
                    <div className="text-center space-y-3">
                        <p className="text-gray-700 text-md">Anda masuk sebagai:</p>
                        <p className="text-lg font-medium text-indigo-600">{user.email}</p>
                        <p className="text-sm text-gray-400">ID Pengguna: #{user.id}</p>
                    </div>
                ) : (
                    <p className="text-center text-red-500">Gagal memuat data pengguna.</p>
                )}
                <div className="text-center mt-6">
                    <ButtonLogout />&nbsp;
                    <Link
                        href="/dashboard/logs"
                        className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                        title="Riwayat Aktivitas Login"
                    >
                        Riwayat Aktivitas Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
