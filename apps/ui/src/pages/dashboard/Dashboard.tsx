import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { CreatePost, PostCard } from "../../components/Post";
import styles from "./styles/dashboard.module.scss";

function Dashboard(): JSX.Element {
  const mockPost: any[] = [];
  return (
    <Container maxWidth="md" className={styles.root}>
      <CreatePost />
      <Box>
        {mockPost.length === 0 ? (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
              borderRadius: "10px",
              textAlign: "center",
              minHeight: "200px",
              width: "100%",
              background: "rgb(213, 226, 225)",
            }}
          >
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                No posts yet!
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                You haven’t created any posts. Share your thoughts or updates
                with others!
              </Typography>
            </CardContent>
          </Card>
        ) : (
          mockPost.map((post, index) => <PostCard key={index} />)
        )}
      </Box>
    </Container>
  );
}

export default Dashboard;
