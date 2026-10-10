"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const form = new FormData(e.currentTarget);
        const name = String(form.get("name")).trim();

        const { error } = await authClient.updateUser({ name });

        setLoading(false);

        if (error) {
            setError(error.message ?? "Could not update your information");
            return;
        }

        router.push("/profile");
        router.refresh();
    }

    if (isPending) {
        return (
            <div className="flex justify-center py-12">
                <span className="loading loading-spinner" />
            </div>
        );
    }

    return (
        <div className="flex justify-center py-12 px-4">
            <form
                onSubmit={handleSubmit}
                className="card bg-base-100 w-full max-w-sm shadow-xl p-6"
            >
                <h1 className="text-2xl font-bold mb-4">Update Information</h1>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Name</legend>
                    <input
                        name="name"
                        type="text"
                        required
                        defaultValue={session?.user.name}
                        className="input w-full"
                    />
                </fieldset>

                {error && <p className="text-error text-sm mt-2">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-success text-white mt-4"
                >
                    {loading ? "Updating..." : "Update Information"}
                </button>

                <Link href="/profile" className="btn btn-ghost mt-2">
                    Cancel
                </Link>
            </form>
        </div>
    );
}