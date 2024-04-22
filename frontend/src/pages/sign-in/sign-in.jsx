import { SignIn } from "@clerk/clerk-react"
import { CenteredLayout } from "../../layouts"

export const SignInPage = () => {
    return (
        <CenteredLayout extras={{ "data-testid": "signin" }}>
            <SignIn path="/sign-in" signUpUrl="/sign-up" redirectUrl={"/dashboard"} />
        </CenteredLayout>
    )
}