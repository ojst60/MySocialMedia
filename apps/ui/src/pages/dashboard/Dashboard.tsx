import { Container } from "@mui/material";
import { CreatePost } from "../../components/Post";
import { useUiSelector } from "../../redux/hooks";
import styles from "./styles/dashboard.module.scss";

function Dashboard(): JSX.Element {
  const username = useUiSelector((state) => state.auth.username);

  return (
    <Container maxWidth="md" className={styles.root}>
      <CreatePost/>
    </Container>
  );
}

export default Dashboard;
