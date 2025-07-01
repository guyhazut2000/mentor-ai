"use client";

import { ClerkProvider, ClerkLoaded } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <div>
      <ClerkProvider>
        <ClerkLoaded>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </div>
  );
};
