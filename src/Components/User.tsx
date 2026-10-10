"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const User = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                    router.refresh();
                },
            },
        });
    };

    if (isPending) {
        return <div className="skeleton h-10 w-10 rounded-full" />;
    }

    if (!session) {
        return (
            <div className="flex items-center gap-2">
                <Link href="/login" className="btn btn-ghost btn-sm">
                    Log in
                </Link>
                <Link href="/signup" className="btn btn-success btn-sm text-white">
                    Sign up
                </Link>
            </div>
        );
    }

    const { name, email } = session.user;

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar avatar-placeholder"
            >
                <div className="bg-[#05893E] text-white w-10 rounded-full">
                    <span className="text-lg">{name?.charAt(0).toUpperCase()}</span>
                </div>
            </div>

            <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-2 shadow"
            >
                <li className="menu-title px-3 py-2">
                    <span className="block font-semibold text-base-content">{name}</span>
                    <span className="block text-xs font-normal">{email}</span>
                </li>
                <li>
                    <Link href="/profile">My Profile</Link>
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </div>
    );
};

export default User;