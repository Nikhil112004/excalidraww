"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { HTTP_BACKEND } from "@/config";

export function AuthPage({isSignin}: {
    isSignin: boolean
}) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            if (!isSignin) {
                await axios.post(`${HTTP_BACKEND}/signup`, { name, email, password });
            }

            const response = await axios.post(`${HTTP_BACKEND}/signin`, { email, password });
            window.localStorage.setItem("token", response.data.token);
            router.push("/canvas/1");
        } catch (cause) {
            const message = axios.isAxiosError<{ message?: string }>(cause)
                ? cause.response?.data?.message
                : undefined;
            setError(message ?? "Could not sign in. Check the server and your details.");
        } finally {
            setSubmitting(false);
        }
    }

    return <div className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
        <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-xl border-2 border-foreground bg-card p-6 shadow-lg">
            <h1 className="text-3xl font-bold">{isSignin ? "Sign in" : "Create your account"}</h1>
            {!isSignin && <input
                className="w-full rounded border p-3"
                type="text"
                placeholder="Name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
            />}
            <input
                className="w-full rounded border p-3"
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />
            <input
                className="w-full rounded border p-3"
                type="password"
                placeholder="Password"
                autoComplete={isSignin ? "current-password" : "new-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />
            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            <button className="w-full rounded bg-primary p-3 font-semibold text-primary-foreground disabled:opacity-60" disabled={submitting}>
                {submitting ? "Please wait..." : isSignin ? "Sign in" : "Sign up"}
            </button>
            <p className="text-sm">
                {isSignin ? "New here? " : "Already have an account? "}
                <Link className="underline" href={isSignin ? "/signup" : "/signin"}>
                    {isSignin ? "Sign up" : "Sign in"}
                </Link>
            </p>
        </form>
        </div>
}
