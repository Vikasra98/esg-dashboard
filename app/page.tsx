"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignUp from "@/app/signUp/page";
import { authApi } from "./helper/api";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (authApi.isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <main className="">
      <SignUp />
    </main>
  );
}
