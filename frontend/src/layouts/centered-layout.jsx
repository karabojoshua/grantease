
export const CenteredLayout = ({ children, extras }) => {
  return <section
    className="centered-layout"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
    }}
    {...extras}
  >{children}</section>;
};
