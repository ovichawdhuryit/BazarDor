"use client";

import { useMemo, useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import { useSortUI } from "./SortContext";

type SortKey = "default" | "asc" | "desc";

const options: { value: SortKey; label: string }[] = [
    { value: "default", label: "ডিফল্ট" },
    { value: "asc", label: "দাম: কম থেকে বেশি" },
    { value: "desc", label: "দাম: বেশি থেকে কম" },
];

const AllProducts = ({ products }: { products: Product[] }) => {
    const { show } = useSortUI();
    const [sort, setSort] = useState<SortKey>("default");

    const sorted = useMemo(() => {
        if (sort === "default") return products;

        // numeric comparison on `today`, never on the Bengali-formatted text
        return [...products].sort((a, b) =>
            sort === "asc" ? a.today - b.today : b.today - a.today
        );
    }, [products, sort]);

    return (
        <section id="all-products" className="scroll-mt-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
                <div>
                    <h2 className="text-xl font-bold">সব পণ্য</h2>
                    <p className="text-sm text-gray-500">
                        মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
                    </p>
                </div>

                {/* the dropdown only appears after the Hero button is pressed */}
                {show && (
                    <label className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">সাজান</span>

                        <span className="relative">
                            <select
                                id="sort-select"
                                value={sort}
                                onChange={(e) => setSort(e.target.value as SortKey)}
                                className="appearance-none bg-white border border-gray-300 rounded-xl
                                pl-4 pr-10 py-2 text-sm font-medium cursor-pointer
                                hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                            >
                                {options.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>

                            <svg
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M5 7.5l5 5 5-5" />
                            </svg>
                        </span>
                    </label>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sorted.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
};

export default AllProducts;