import {
  Box,
  Button,
  Divider,
  IconButton,
  Tooltip,
  TextareaAutosize,
} from "@mui/material";
import { PhotoAlbum, PhotoCamera } from "@mui/icons-material";

function CreatePost(): JSX.Element {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        width: "100%",
        background: "rgb(213, 226, 225)",
        gap: "16px",
        padding: "15px",
        alignItems: "center",
        borderRadius: "2px",
      }}
    >
      <Box
        component="img"
        alt="Profile pic"
        src={require("./num1.jpg")}
        sx={{
          width: "50px",
          height: "60px",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      <Box
        component="div"
        sx={{
          display: "flex",
          flexFlow: "column nowrap",
          flexGrow: 1,
          gap: "8px",
        }}
      >
        <TextareaAutosize
          placeholder="What's on your mind ?"
          minRows={6}
          maxRows={6}
          className=""
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            fontSize: "15px",
          }}
        />
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Tooltip title="Camera">
              <IconButton>
                <PhotoCamera
                  sx={{
                    color: "rgb(54, 69, 79)",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Photo">
              <IconButton>
                <PhotoAlbum
                  sx={{
                    color: "rgb(54, 69, 79)",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Box component="div">
            <Button
              sx={{
                background: "rgb(0, 123, 137)",
                color: "rgb(255, 255, 255)",
                fontWeight: "bold",
                padding: "3px 15px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              disabled
            >
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CreatePost;
