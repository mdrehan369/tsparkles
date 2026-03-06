"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { Theme } from "./theme";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { LoginModal } from "./auth/login-model";

function GlobalAuthModal() {
  const { isLoginOpen, closeLogin } = useAuth();

  return <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />;
}

function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <main className="min-h-screen">
          <AuthProvider>
            <SiteHeader />
            {children}
            <GlobalAuthModal />
            <SiteFooter />
          </AuthProvider>
        </main>
      </Theme>
    </QueryClientProvider>
  );
}

export default Provider;
