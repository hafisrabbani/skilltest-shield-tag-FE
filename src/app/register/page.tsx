'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetcher } from '../../lib/api';
import Link from "next/link";

interface RegisterForm {
    email: string;
    password: string;
    confirm_password: string;
}

interface RegisterResponse {
    message: string;
}

export default function RegisterPage() {
    const [form, setForm] = useState<RegisterForm>({
        email: '',
        password: '',
        confirm_password: '',
    });

    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirm_password) {
            setError('Password dan Konfirmasi Password tidak sama.');
            return;
        }

        try {
            const res = await fetcher<RegisterResponse>('/register', {
                method: 'POST',
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                    confirm_password: form.confirm_password,
                }),
            });

            alert(res.message || 'Registrasi berhasil');
            router.push('/login');
        } catch (err: any) {
            setError(err.message || 'Terjadi kesalahan saat registrasi');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center text-zinc-900">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={form.confirm_password}
                            onChange={(e) =>
                                setForm({ ...form, confirm_password: e.target.value })
                            }
                        />
                    </div>
                    <p className="text-sm text-gray-600">
                        Sudah punya akun?{' '}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Login di sini
                        </Link>
                    </p>
                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
