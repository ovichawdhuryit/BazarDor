import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t mt-auto sm:px-6  py-4 px-6">
            <div
                className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between 
                items-center text-sm text-gray-700 gap-2"
            >
                <p>
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                <p>
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
};

export default Footer;