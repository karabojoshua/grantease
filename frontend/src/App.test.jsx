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
    it("it should render loading page when isLoaded is false", () => {
        render(<App/>); 
        expect(screen.getAllByTestId("loading-page")).toBeDefined();
    });
    it("it should render sign in page when isSignedIn is false", () => {
        render(<App/>); 
        expect(screen.getByTestId("sign-in")).toBeDefined();
    });
});
