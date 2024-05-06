import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { SignInPage } from './sign-in';

vi.mock("@clerk/clerk-react", () => ({
  SignIn: () => <>Sign Up</>
})); 

describe('SignInPage', () => {
  test('renders Sign In component in centered layout', () => {
    render(
      <SignInPage />
    ); 
    
    expect(screen.getByTestId("sign-in")).toBeVisible();

  });
});
