import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { SignUpPage } from './sign-up';

vi.mock("@clerk/clerk-react", () => ({
  SignUp: () => <>Sign Up</>
}));

describe('SignUpPage', () => {
  test('renders Sign Up component centered layout', () => {
    render(
      <SignUpPage />
    );
    
    expect(screen.getByTestId("sign-up")).toBeVisible();

  });
});
