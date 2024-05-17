import PrimarySearchAppBar from "../components/app-bar";
import '../pages/styles.css';

export const MainLayout = ({ children }) => {
  return (
    <>
    <PrimarySearchAppBar/>
    <main>{children}</main>
    </>
  )
};
