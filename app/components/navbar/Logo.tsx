"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="logo"
      className="hidden md:block cursor-pointer h-auto w-auto"
      height={50}
      width={50}
      priority
      src="/images/logo.png"
    />
  );
};

export default Logo;
