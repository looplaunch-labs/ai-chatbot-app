"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

type ProviderProps = {
  children: ReactNode
}

const queryClient = new QueryClient();

export default function Providers(props: ProviderProps) {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}