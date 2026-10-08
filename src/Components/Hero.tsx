import Image from 'next/image';
import React from 'react';

const Hero = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full"
    })

    return (
     
            <div className='rounded-4xl p-7 m-15 bg-white flex flex-col md:flex-row items-center justify-between gap-8'>

                <div className="flex-1">
                    <div className="inline-block bg-[#E2F2E8] text-[#2E7D32] px-4 py-1.5 rounded-full text-sm font-semibold">
                        {date}
                    </div>

                    <h1 className='font-bold text-6xl'>আজকের বাজারের দাম এক নজরে</h1>
                    <p className='mt-3'>
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-
                        <br />
                        সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <button className='btn bg-green-500 text-white font-medium text-xl mt-3'>
                        সব পণ্য দেখুন
                    </button>
                </div>


                <div className="shrink-0">
                    <Image
                        src="/bazar-hero.png"
                        alt='hero'
                        height={400}
                        width={400}
                    />
                </div>
            </div>
    );
};

export default Hero;