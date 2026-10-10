"use client";

import { createContext, useContext, useState } from "react";

type SortUI = { show: boolean; reveal: () => void };

const SortContext = createContext<SortUI>({ show: false, reveal: () => {} });

export const useSortUI = () => useContext(SortContext);

export function SortProvider({ children }: { children: React.ReactNode }) {
    const [show, setShow] = useState(false);

    return (
        <SortContext.Provider value={{ show, reveal: () => setShow(true) }}>
            {children}
        </SortContext.Provider>
    );
}