"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authApi } from '../helper/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = authApi.isAuthenticated();
      
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#12291E] mx-auto"></div>
          <p className="mt-4 text-[#12291E]">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
