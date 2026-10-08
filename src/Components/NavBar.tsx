import Image from "next/image";
import Link from "next/link";
import React from "react";
import Marquee from "../Components/Marquee";

interface post {
    id: string;
    nameBn: string;
    icon: string;
}

const NavBar = async () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    const response = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/categories",
        { next: { revalidate: 3600 } }
    );
    const data: post[] = await response.json();

    return (
        <div>
            <div className="bg-[#E1E8E1]">
                <div className="flex items-center justify-between mx-15">
                    {/* Logo ক্লিক করলে homepage এ যাবে */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            className="bg-[#05893E] rounded-xl m-2"
                            src="/logo-icon.png"
                            alt="logo"
                            width={50}
                            height={50}
                        />

                        <div>
                            <h2 className="font-bangla text-xl font-bold">
                                বাজার দর
                            </h2>

                            <p className="font-bangla text-sm">{date}</p>
                        </div>
                    </Link>

                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <Image
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                            </div>
                        </div>

                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>

                            <li>
                                <a>Settings</a>
                            </li>

                            <li>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="mx-16">
                <ul className="flex gap-6 py-3 overflow-x-auto">
                    <li>
                        <Link
                            href="/"
                            className="flex items-center gap-1 whitespace-nowrap hover:text-green-600"
                        >
                      
                        
                        </Link>
                    </li>

                    {data.map((post) => (
                        <li key={post.id}>
                            <Link
                                href={`/category/${post.id}`}
                                className="flex items-center gap-1 whitespace-nowrap hover:text-green-600"
                            >
                                <span>{post.icon}</span>
                                <span>{post.nameBn}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NavBar;