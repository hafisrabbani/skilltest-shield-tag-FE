'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetcher } from '../../lib/api';
import { Login, LoginResponse } from '../../types/api';
import Link from "next/link";

export default function LoginPage() {
    const [form, setForm] = useState<Login>({ email: '', password: '' });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetcher<LoginResponse>('/login', {
                method: 'POST',
                body: JSON.stringify(form),
            });
            console.log("response:", res);

            localStorage.setItem('token', res.token);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center text-zinc-900">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>
                    <p className="text-sm text-gray-600">
                        Belum punya akun?{' '}
                        <Link href="/register" className="text-blue-600 hover:underline">
                            Daftar di sini
                        </Link>
                    </p>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
