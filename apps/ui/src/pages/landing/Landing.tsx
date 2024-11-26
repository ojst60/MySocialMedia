import styles from "./styles/landing.module.scss";
import { Box, Button, Typography, Grid2, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.9)",

  ...theme.typography.body2,

  borderRadius: "4",

  padding: "60px",
  boxShadow: "3",
  textAlign: "center",

  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function Landing(): JSX.Element {
  const navigate = useNavigate();

  function onLoginHandler() {
    navigate("/login");
  }

  function onSignUpHandler() {
    navigate("/register");
  }

  return (
    <Grid2
      container
      className={styles["root-container"]}
      sx={{
        minHeight: "100vh",
        padding: 2,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid2 size={{ xs: 12, md: 8, lg: 9 }}>
        <Item>
          <Typography variant="h3" gutterBottom color="primary">
            Welcome to the Gist
          </Typography>
          <Typography variant="body1" gutterBottom>
            Join us to share your ideas and connect with a vibrant community.
          </Typography>

          <Box className={styles["button-container"]} sx={{ marginTop: 3 }}>
            <Button
              onClick={onSignUpHandler}
              variant="contained"
              size="large"
              sx={{ marginBottom: 2, width: "80%" }}
            >
              Create an Account
            </Button>
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              Already have an account?
            </Typography>
            <Button
              onClick={onLoginHandler}
              variant="outlined"
              size="large"
              sx={{ width: "80%" }}
            >
              Login
            </Button>
          </Box>
        </Item>
      </Grid2>
      <Outlet />
    </Grid2>
  );
}

export default Landing;
