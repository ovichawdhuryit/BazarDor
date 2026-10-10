"use client";

import { useSortUI } from "./SortContext";

export default function ViewAllButton() {
    const { reveal } = useSortUI();

    const handleClick = () => {
        reveal(); // show the dropdown

        setTimeout(() => {
            document
                .getElementById("all-products")
                ?.scrollIntoView({ behavior: "smooth" });
            document
                .getElementById("sort-select")
                ?.focus({ preventScroll: true });
        }, 100);
    };

    return (
        <button
            onClick={handleClick}
            className="btn bg-green-500 text-white font-medium text-xl mt-3"
        >
            সব পণ্য দেখুন
        </button>
    );
}