'use client';

import { Button } from '@repo/ui/components/ui/button';
import React from 'react';
import { signOut } from 'next-auth/react';

export default function SignOut() {
  return (
    <div className="flex justify-center">
      <Button className="signup-button" onClick={() => signOut()}>
        로그아웃
      </Button>
    </div>
  );
}
