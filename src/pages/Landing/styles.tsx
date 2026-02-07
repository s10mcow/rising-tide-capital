import { styled } from "@mui/material/styles";
import { Grid, GridProps } from "@mui/material";

export const SectionContainer = styled(Grid)<
  GridProps & { component?: React.ElementType }
>(({ theme }) => ({
  marginTop: "3.75rem",

  [theme.breakpoints.up("md")]: {
    marginTop: "90px",
  },
}));
