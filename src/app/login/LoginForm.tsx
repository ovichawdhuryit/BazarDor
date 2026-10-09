"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/Components/SocialButtons";

export default function LoginForm({ alreadyExists }: { alreadyExists: boolean }) {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const form = new FormData(e.currentTarget);
        const { error } = await authClient.signIn.email({
            email: String(form.get("email")),
            password: String(form.get("password")),
        });

        setLoading(false);

        if (error) {
            setError(error.message ?? "Invalid email or password");
            return;
        }

        router.push("/");
        router.refresh();
    }

    return (
        <div className="flex justify-center py-12 px-4">
            <form
                onSubmit={handleSubmit}
                className="card bg-base-100 w-full max-w-sm shadow-xl p-6"
            >
                <h1 className="text-2xl font-bold mb-4">Log in</h1>

                {alreadyExists && (
                    <div role="alert" className="alert alert-info alert-soft mb-4 text-sm">
                        You already have an account with this email. Please log in.
                    </div>
                )}

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email</legend>
                    <input name="email" type="email" required className="input w-full" />

                    <legend className="fieldset-legend">Password</legend>
                    <input name="password" type="password" required className="input w-full" />
                </fieldset>

                {error && <p className="text-error text-sm mt-2">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-success text-white mt-4"
                >
                    {loading ? "Logging in..." : "Log in"}
                </button>

                <SocialButtons />

                <p className="text-sm mt-4 text-center">
                    New here?{" "}
                    <Link href="/signup" className="link link-success">
                        Create an account
                    </Link>
                </p>
            </form>
        </div>
    );
}