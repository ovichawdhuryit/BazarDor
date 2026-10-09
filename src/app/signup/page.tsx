"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/Components/SocialButtons";

export default function SignupPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const form = new FormData(e.currentTarget);
        const { error } = await authClient.signUp.email({
            name: String(form.get("name")),
            email: String(form.get("email")),
            password: String(form.get("password")),
        });

        setLoading(false);

        if (error) {
            // user already exists, so send them to login
            if (error.code?.startsWith("USER_ALREADY_EXISTS")) {
                router.push("/login?exists=1");
                return;
            }
            setError(error.message ?? "Something went wrong");
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
                <h1 className="text-2xl font-bold mb-4">Create account</h1>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Name</legend>
                    <input name="name" type="text" required className="input w-full" />

                    <legend className="fieldset-legend">Email</legend>
                    <input name="email" type="email" required className="input w-full" />

                    <legend className="fieldset-legend">Password</legend>
                    <input
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        className="input w-full"
                    />
                </fieldset>

                {error && <p className="text-error text-sm mt-2">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-success text-white mt-4"
                >
                    {loading ? "Creating..." : "Sign up"}
                </button>

                <SocialButtons />

                <p className="text-sm mt-4 text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="link link-success">
                        Log in
                    </Link>
                </p>
            </form>
        </div>
    );
}