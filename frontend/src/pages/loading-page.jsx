import { CircularProgress } from "@mui/material";
import { CenteredLayout } from "../layouts";


export const LoadingPage = () => {
  return (
    <CenteredLayout extras={{ "data-testid": "loading-page" }}>
      <CircularProgress />
    </CenteredLayout>
  );
};
