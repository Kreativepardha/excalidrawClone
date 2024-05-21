'use client';
import React from 'react';
import { SessionProvider, useSession} from 'next-auth/react';

export const Providers = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};