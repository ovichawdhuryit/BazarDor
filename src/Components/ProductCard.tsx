import Link from 'next/link';
import React from 'react';
import { unitBn } from "@/lib/format";

export type Product = {
    id: number;
    slug: string;
    nameBn: string;
    unit: string;
    image: string;
    today: number;
    change: { dir: 'up' | 'down' | 'flat'; pct: number };
};

// export const unitBn: Record<string, string> = {
//     kg: 'প্রতি কেজি',
//     litre: 'প্রতি লিটার',
//     dozen: 'প্রতি ডজন',
//     piece: 'প্রতি পিস',
// };

const formatPrice = (n: number) => n.toLocaleString('bn-BD');

const formatPct = (n: number) =>
    Math.abs(n).toLocaleString('bn-BD', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });

const badgeStyle = {
    up: 'text-red-600 bg-red-50',
    down: 'text-green-700 bg-green-50',
    flat: 'text-gray-600 bg-gray-100',
};

const arrow = { up: '▲', down: '▼', flat: '—' };

const ProductCard = ({ product }: { product: Product }) => {
    const { nameBn, unit, image, today, change, id } = product;

    return (
        <Link href={`/product/${id}`}
            className="block bg-white rounded-2xl border border-gray-200 p-4 
            hover:shadow-md hover:border-green-300 transition"
        >
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#EAF3EC] flex items-center justify-center text-2xl">
                    {image}
                </div>
                <div>
                    <h3 className="font-semibold leading-tight">{nameBn}</h3>
                    <p className="text-xs text-gray-500">{unitBn[unit] ?? unit}</p>
                </div>
            </div>

            <p className="text-xs mt-5">আজকের দাম</p>
            <div className="flex items-center justify-between">
                <p>
                    <span className="text-xl font-bold">{formatPrice(today)}</span> টাকা
                </p>
                <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeStyle[change.dir]}`}
                >
                    {arrow[change.dir]} {formatPct(change.pct)}%
                </span>
            </div>
        </div>
        </Link>
    );
};

export default ProductCard;