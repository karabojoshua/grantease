import { ClerkProvider } from '@clerk/clerk-react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { SignUpPage } from './sign-up';

describe('SignUpPage', () => {
  test('renders Sign Up component centered layout', () => {
    render(
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <SignUpPage />
    </ClerkProvider>);
    
    expect(screen.getByTestId("sign-up")).toBeDefined();

  });
});
