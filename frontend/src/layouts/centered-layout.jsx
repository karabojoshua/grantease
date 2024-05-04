
export const CenteredLayout = ({ children, extras }) => {
  return <section
    className="centered-layout"
    style={{
      display: "flex",
      backgroundImage: 'url("./subtle-prism.svg")',
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
    }}
    {...extras}
  >{children}</section>;
};
