import Image from "next/image";
import Link from "next/link";
import React from "react";
import CategoryLinks from "./CategoryLinks";
import User from "./User";

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

                            <p className="font-bangla text-sm">
                                {date}
                                </p>
                        </div>
                    </Link>

                   <User/>
                </div>
            </div>

            {/* Category list (active highlight CategoryLinks এর ভেতরে) */}
            <div className="mx-16">
                <CategoryLinks categories={data} />
            </div>
        </div>
    );
};

export default NavBar;