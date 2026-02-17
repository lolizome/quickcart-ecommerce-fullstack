'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
    return (
        <ClerkProvider>
            <AppContextProvider>
                <Toaster />
                {children}
            </AppContextProvider>
        </ClerkProvider>
    );
}