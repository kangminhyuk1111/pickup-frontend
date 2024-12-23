import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Footer from "@/app/landing/FooterSection";
import {NavBar} from "@/app/landing/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PICKUP - Find Your Next Game",
    description: "농구를 사랑하는 모든 플레이어들을 위한 매칭 플랫폼",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />
        </body>
        </html>
    );
}