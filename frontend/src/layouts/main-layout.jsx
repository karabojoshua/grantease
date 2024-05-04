import PrimarySearchAppBar from "../components/app-bar";

export const MainLayout = ({ children }) => {
  return (
    <>
    <PrimarySearchAppBar/>
    <main>{children}</main>
    </>
  )
};
