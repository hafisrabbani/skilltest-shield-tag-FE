'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetcher } from '../../../lib/api';
import Link from "next/link";

type AuthLog = {
    id: number;
    action: string;
    ip_address: string;
    timestamp: string;
    user_agent: string;
};

export default function AuthLogPage() {
    const [logs, setLogs] = useState<AuthLog[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const fetchLogs = async () => {
            try {
                const res = await fetcher<AuthLog[]>('/audit-logs', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLogs(res);
            } catch (err) {
                console.error('Gagal memuat auth logs:', err);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, [router]);

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-500 animate-pulse">
                Memuat data log autentikasi...
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <Link href="/dashboard" className="text-blue-600 hover:underline mb-4 inline-block">
                Kembali ke Dashboard
            </Link>
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Riwayat Aktivitas Login
            </h1>
            <p className="text-gray-600 mb-4">
                Berikut adalah daftar aktivitas login dan logout yang tercatat. Gunakan informasi ini untuk
                memantau keamanan akun Anda.
            </p>
            {logs.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    Tidak ada data log tersedia.
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left font-medium text-gray-700">Waktu</th>
                            <th className="px-6 py-3 text-left font-medium text-gray-700">Aksi</th>
                            <th className="px-6 py-3 text-left font-medium text-gray-700">IP Address</th>
                            <th className="px-6 py-3 text-left font-medium text-gray-700">Perangkat</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-3 text-gray-800 whitespace-nowrap">
                                    {new Date(log.timestamp).toLocaleString('id-ID', {
                                        dateStyle: 'medium',
                                        timeStyle: 'short',
                                    })}
                                </td>
                                <td className="px-6 py-3 text-gray-600">{log.action}</td>
                                <td className="px-6 py-3 text-gray-600">{log.ip_address}</td>
                                <td className="px-6 py-3 text-gray-500 break-words max-w-xs">
                                    {log.user_agent}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
