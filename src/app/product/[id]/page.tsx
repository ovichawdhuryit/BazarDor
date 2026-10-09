import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unitBn } from "@/lib/format";

type Market = {
    market: string;
    division: string;
    min: number;
    max: number;
};

type ProductDetail = {
    id: number;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    change: { dir: "up" | "down" | "flat"; pct: number };
    markets: Market[];
};

// সংখ্যা বাংলায়; ভগ্নাংশ থাকলে দুই ঘর (৬৩.৫০)
const bn = (n: number) =>
    n.toLocaleString("bn-BD", {
        minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
        maximumFractionDigits: 2,
    });

const ProductPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    const res = await fetch(
        `https://api.abcz.workers.dev/api/bazardor/products/${id}`,
        { next: { revalidate: 3600 } }
    );
    if (!res.ok) notFound();

    const p: ProductDetail = await res.json();

    const rows = p.markets
        .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
        .sort((a, b) => a.avg - b.avg);

    const lowest = p.markets.reduce((a, b) => (b.min < a.min ? b : a));
    const highest = p.markets.reduce((a, b) => (b.max > a.max ? b : a));

    const diff = Math.abs(p.today - p.yesterday);
    const unit = unitBn[p.unit] ?? p.unit;

    const changeText = {
        up: "বেড়েছে",
        down: "কমেছে",
        flat: "অপরিবর্তিত",
    }[p.change.dir];

    const changeColor = {
        up: "text-red-600",
        down: "text-green-700",
        flat: "text-gray-600",
    }[p.change.dir];

    const arrow = { up: "▲", down: "▼", flat: "—" }[p.change.dir];

    return (
        <div className="px-4 sm:px-8 lg:px-20 py-6 space-y-6">

            <nav className="text-xs text-gray-600 flex items-center gap-2">
                <Link href="/" className="hover:underline">হোম</Link>
                <span>›</span>
                <Link href={`/category/${p.category}`} className="hover:underline">
                    {p.categoryNameBn}
                </Link>
                <span>›</span>
                <span>{p.nameBn}</span>
            </nav>


            <section className="bg-white rounded-3xl border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#EAF3EC] flex items-center justify-center text-4xl">
                        {p.image}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{p.nameBn}</h1>
                        <p className="text-sm text-gray-500">
                            {unit} · {p.categoryNameBn}
                        </p>
                        <p className="text-sm mt-1">
                            গতকালের তুলনায় আজ দাম{" "}
                            <span className="font-bold">{changeText}</span>
                            {p.change.dir !== "flat" && <> · {bn(diff)} টাকা</>}
                        </p>
                    </div>
                </div>

                <div className="bg-[#EAF3EC] rounded-2xl px-6 py-4 text-center min-w-40">
                    <p className="text-xs text-gray-600">আজকের দাম</p>
                    <p className="text-4xl font-bold">{bn(p.today)}</p>
                    <p className="text-xs text-gray-600">
                        টাকা / {unit.replace("প্রতি ", "")}
                    </p>
                    <p className={`text-xs font-semibold mt-1 ${changeColor}`}>
                        {arrow} {Math.abs(p.change.pct).toLocaleString("bn-BD", {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                        })}%
                    </p>
                </div>
            </section>


            <section className="bg-white rounded-3xl border border-gray-200 p-6">
                <h2 className="font-bold mb-4">দামের সারসংক্ষেপ</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-200 rounded-xl p-4">
                        <p className="text-xs text-gray-600">সর্বনিম্ন দাম</p>
                        <p className="text-green-700 font-bold text-2xl">
                            {bn(lowest.min)} <span className="text-sm">টাকা</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            সবচেয়ে কম দামের বাজার: {lowest.market}
                        </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-4">
                        <p className="text-xs text-gray-600">সর্বাধিক দাম</p>
                        <p className="text-red-600 font-bold text-2xl">
                            {bn(highest.max)} <span className="text-sm">টাকা</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            সবচেয়ে বেশি দামের বাজার: {highest.market}
                        </p>
                    </div>

                    <div className="border border-gray-200 rounded-xl p-4">
                        <p className="text-xs text-gray-600">গড় দাম</p>
                        <p className="text-green-700 font-bold text-2xl">
                            {bn(p.today)} <span className="text-sm">টাকা</span>
                        </p>
                        <p className="text-xs text-gray-500">{unit}-এর হিসাবে</p>
                    </div>
                </div>
            </section>


            <section className="bg-white rounded-3xl border border-gray-200 p-6">
                <h2 className="font-bold mb-4">বাজারভিত্তিক আজকের দাম</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[560px]">
                        <thead>
                            <tr className="text-gray-500 text-left border-b border-gray-200">
                                <th className="py-3 px-3 font-normal">বাজার</th>
                                <th className="py-3 px-3 font-normal">বিভাগ</th>
                                <th className="py-3 px-3 font-normal text-right">সর্বনিম্ন</th>
                                <th className="py-3 px-3 font-normal text-right">সর্বাধিক</th>
                                <th className="py-3 px-3 font-normal text-right">গড়</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((r, i) => (
                                <tr
                                    key={r.market + r.division}
                                    className={`border-b border-gray-200 ${
                                        i % 2 === 1 ? "bg-[#EEF4EE]" : ""
                                    }`}
                                >
                                    <td className="py-3 px-3">{r.market}</td>
                                    <td className="py-3 px-3">{r.division}</td>
                                    <td className="py-3 px-3 text-right">{bn(r.min)} টাকা</td>
                                    <td className="py-3 px-3 text-right">{bn(r.max)} টাকা</td>
                                    <td className="py-3 px-3 text-right font-bold">{bn(r.avg)} টাকা</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default ProductPage;