"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
    id: string;
    nameBn: string;
    icon: string;
}

const CategoryLinks = ({ categories }: { categories: Category[] }) => {
    const pathname = usePathname();

    const base =
        "flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full text-sm transition-colors";
    const active = "bg-[#05893E] text-white font-semibold";
    const inactive = "hover:bg-[#E2F2E8] hover:text-green-700";

    return (
        <ul className="flex gap-2 py-3 overflow-x-auto">
            {categories.map((cat) => {
                const href = `/category/${cat.id}`;
                const isActive = pathname === href;

                return (
                    <li key={cat.id}>
                        <Link
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className={`${base} ${isActive ? active : inactive}`}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.nameBn}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default CategoryLinks;