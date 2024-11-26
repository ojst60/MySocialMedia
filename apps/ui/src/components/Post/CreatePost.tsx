import {
  Box,
  Button,
  Divider,
  IconButton,
  Tooltip,
  TextareaAutosize,
  CircularProgress,
} from "@mui/material";
import { PhotoAlbum, PhotoCamera } from "@mui/icons-material";

type ICreatePost = {
  text: string;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPostSubmit: () => Promise<void>;
  isSubmitting: boolean;
};

function CreatePost({
  text,
  onTextChange,
  onPostSubmit,
  isSubmitting,
}: ICreatePost): JSX.Element {
  const isSubmitDisabled = text.trim().length === 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: "16px",
        padding: "16px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TextareaAutosize
        placeholder="What's on your mind?"
        minRows={4}
        maxRows={8}
        value={text}
        onChange={onTextChange}
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          resize: "none",
        }}
      />
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Tooltip title="Add a photo">
            <IconButton>
              <PhotoAlbum sx={{ color: "#1976d2" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Take a photo">
            <IconButton>
              <PhotoCamera sx={{ color: "#1976d2" }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Button
          variant="contained"
          color="primary"
          disabled={isSubmitDisabled || isSubmitting}
          onClick={onPostSubmit}
          sx={{
            borderRadius: "8px",
            padding: "8px 16px",
            textTransform: "none",
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Post"
          )}
        </Button>
      </Box>
    </Box>
  );
}

export default CreatePost;
