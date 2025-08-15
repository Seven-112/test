"use client";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full h-20 bg-black/80 text-white px-6 flex items-center">
      <Image
        src="/icons/football.png"
        alt="Football Icon"
        width={48}
        height={41.14}
      />
      <h1 className="font-inter font-normal text-[24px] ml-6 md:ml-8">Fantasy Football</h1>
    </header>
  );
}
