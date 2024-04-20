import { SignIn, SignUp, UserButton, UserProfile, useAuth } from "@clerk/clerk-react";
import { CircularProgress } from "@mui/material";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { CenteredLayout, MainLayout } from "./layouts";
import { TestPage } from "./pages/test";

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <CenteredLayout><CircularProgress /></CenteredLayout>
  }

  return (
    <BrowserRouter>
      <Routes>
        {isSignedIn && (
          <Route element={<MainLayout><Outlet /></MainLayout>}>
            <Route path="/dashboard" element={<UserButton />} />
            <Route path="/profile" element={<UserProfile />} />

            <Route path="/test" element={<TestPage/>} />
          </Route>
        )}
        {!isSignedIn && (
          <Route element={<CenteredLayout><Outlet /></CenteredLayout>}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        )}

        <Route path="/" element={isSignedIn ? <Navigate to={"/dashboard"} /> : <Navigate to={"/sign-in"} />} />
        <Route path="*" element={<CenteredLayout>404 Not Found</CenteredLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
