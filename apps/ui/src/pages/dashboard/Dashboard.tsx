import { useState } from "react";
import { Box, Container, Typography, Grid2 } from "@mui/material";
import { CreatePost, PostCard } from "../../components/Post";
import { fetchApi } from "../../services/apis/fetchAPI";
import { useUiSelector } from "../../redux/hooks";

function Dashboard(): JSX.Element {
  const [postText, setPostText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const userId = useUiSelector((state) => state.auth.id);

  function onPostFieldChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPostText(e.target.value);
  }

  async function onSubmitPost() {
    setIsSubmitting(true);
    const res = await fetchApi({
      method: "POST",
      url: "posts",
      body: { userId, content: postText },
    });

    if (res.error) {
      setIsSubmitting(false);
      return;
    }

    setPostText("");
    setIsSubmitting(false);
  }

  const mockPosts = [
    { userName: "John Doe", content: "Hello world!", timestamp: "2 hours ago" },
    { userName: "Jane Smith", content: "Enjoying the sunshine!", timestamp: "1 day ago" },
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: 4 }}>
      <CreatePost
        text={postText}
        onTextChange={onPostFieldChange}
        onPostSubmit={onSubmitPost}
        isSubmitting={isSubmitting}
      />

      <Box sx={{ marginTop: 4 }}>
        {mockPosts.length === 0 ? (
          <Typography variant="h6" textAlign="center" color="textSecondary">
            No posts yet. Start sharing your thoughts!
          </Typography>
        ) : (
          <Grid2 container spacing={3}>
            {mockPosts.map((post, index) => (
              <Grid2  size={{ xs:12 ,sm:6 ,md:4 }} key={index}>
                <PostCard {...post} />
              </Grid2>
            ))}
          </Grid2>
        )}
      </Box>
    </Container>
  );
}

export default Dashboard;
