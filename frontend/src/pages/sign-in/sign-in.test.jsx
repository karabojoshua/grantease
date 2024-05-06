import { ClerkProvider } from '@clerk/clerk-react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { SignInPage } from './sign-in';

describe('SignInPage', () => {
  test('renders Sign In component in centered layout', () => {
    render(
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <SignInPage />
    </ClerkProvider>);
    
    expect(screen.getByTestId("sign-in")).toBeDefined();

  });
});
