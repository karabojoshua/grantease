import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import App from './App';

// Uncomment a test to run it (*Figure out how to mock change mocks in runtime*)

describe("App", () => {
    it("it renders sign in page when user is not signed in", () => {
        vi.mock('@clerk/clerk-react', () => ({
            SignIn: () => <>Sign In</>,
            SignUp: () => <>Sign Up</>,
            UserButton: () => <>User Button</>,
            UserProfile: () => <>User Profile</>,
            useAuth: () => ({ isLoaded: true, isSignedIn: false }),
        }));

        render(<App/>);
        expect(screen.getByText("Sign In")).toBeDefined();
    });

    // it("it renders dashboard when user is signed in", () => {
    //     vi.mock('@clerk/clerk-react', () => ({
    //         SignIn: () => <>Sign In</>,
    //         SignUp: () => <>Sign Up</>,
    //         UserButton: () => <>User Button</>,
    //         UserProfile: () => <>User Profile</>,
    //         useAuth: () => ({ isLoaded: true, isSignedIn: true }),
    //     }));

    //     render(<App/>);
    //     expect(screen.getByText("User Button")).toBeDefined();
    // });

    // it("it renders loading page when auth is not loaded", () => {
    //     vi.mock('@clerk/clerk-react', () => ({
    //         SignIn: () => <>Sign In</>,
    //         SignUp: () => <>Sign Up</>,
    //         UserButton: () => <>User Button</>,
    //         UserProfile: () => <>User Profile</>,
    //         useAuth: () => ({ isLoaded: false, isSignedIn: false }),
    //     }));

    //     render(<App/>);
    //     expect(screen.getByTestId("loading-page")).toBeDefined();
    // });
});
