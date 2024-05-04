import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import App from './App';

vi.mock('@clerk/clerk-react', () => {
    const useAuth = vi.fn();
    useAuth
    .mockImplementationOnce(() => ({ isLoaded: false, isSignedIn: false }))
    .mockImplementationOnce(() => ({ isLoaded: true, isSignedIn: false }))
    .mockImplementationOnce(() => ({ isLoaded: true, isSignedIn: true }));
    
    return {
        SignIn: () => <>Sign In</>,
        SignUp: () => <>Sign Up</>,
        UserButton: () => <>User Button</>,
        UserProfile: () => <>User Profile</>,
        useAuth
    };
});


describe("App", () => {
    it("it renders sign in page when user is not signed in", () => {
        render(<App/>);
        expect(screen.getByText("Sign In")).toBeDefined();
    });
});
