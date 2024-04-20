
export const CenteredLayout = ({ children }) => {
  return <section
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
    }}
  >{children}</section>;
};
