import React from 'react';
import ProductCard, { Product } from './ProductCard';

const PriceWise = async () => {
    const response = await fetch(
        'https://api.abcz.workers.dev/api/bazardor/products',
        { next: { revalidate: 3600 } } 
    );
    const data: Product[] = await response.json();

    const increased = data
        .filter((p) => p.change.dir === 'up')
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    const decreased = data
        .filter((p) => p.change.dir === 'down')
        .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
        .slice(0, 6);

    const grid = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';

    return (
        <div className="px-20 py-6 space-y-10">
    
            <section>
                <h2 className="text-xl font-bold mb-4">
                    <span className="text-red-500 text-sm">▲</span> আজ দাম বেড়েছে
                </h2>
                <div className={grid}>
                    {increased.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>

 
            <section>
                <h2 className="text-xl font-bold mb-4">
                    <span className="text-green-600 text-sm">▼</span> আজ দাম কমেছে
                </h2>
                <div className={grid}>
                    {decreased.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>


            <section>
                <h2 className="text-xl font-bold">সব পণ্য</h2>
                <p className="text-sm text-gray-500 mb-4">
                    মোট {data.length.toLocaleString('bn-BD')}টি পণ্য দেখানো হচ্ছে
                </p>
                <div className={grid}>
                    {data.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PriceWise;