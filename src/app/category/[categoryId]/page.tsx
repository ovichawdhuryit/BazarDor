import React from "react";
import { notFound } from "next/navigation";
import ProductCard, { Product } from "@/Components/ProductCard"

const CategoryPage = async ({
    params,
}: {
    params: Promise<{ categoryId: string }>;
}) => {
    const { categoryId } = await params;

    const response = await fetch(
        `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`,
        { next: { revalidate: 3600 } }
    );

    if (!response.ok) notFound();

    const items: Product[] = await response.json();

    if (items.length === 0) notFound();

    const { categoryNameBn, categoryIcon } = items[0] as Product & {
        categoryNameBn: string;
        categoryIcon: string;
    };

    return (
        <div className="px-20 py-6">
            <h1 className="text-3xl font-bold">
                {categoryIcon} {categoryNameBn}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
                মোট {items.length.toLocaleString("bn-BD")}টি পণ্য
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;