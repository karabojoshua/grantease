import { SignIn } from "@clerk/clerk-react";
import { CenteredLayout } from "../../layouts";
import theme from '../../theme.ts';

export const SignInPage = () => {
    return (
        <CenteredLayout extras={{ "data-testid": "signin" }}>
            <section>
                <SignIn path="/sign-in" signUpUrl="/sign-up" redirectUrl={"/home"} style={{ 
                '--clerk-colors-primary': theme.palette.primary.main, // Set primary color
                '--clerk-colors-secondary': theme.palette.secondary.main, // Set secondary color
            }} />
            </section>
                
        </CenteredLayout>
    )
}