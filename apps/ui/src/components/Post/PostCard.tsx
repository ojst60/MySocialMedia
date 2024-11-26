import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import { ThumbUpOutlined, CommentOutlined, ShareOutlined } from "@mui/icons-material";

function PostCard({
  userName,
  content,
  timestamp,
}: {
  userName: string;
  content: string;
  timestamp: string;
}): JSX.Element {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: 2,
        background: "white",
      }}
    >
      {/* Header */}
      <CardHeader
        avatar={
          <Avatar
            src="https://via.placeholder.com/50" // Replace with dynamic image if available
            alt={userName}
            sx={{ width: 50, height: 50 }}
          />
        }
        title={<Typography fontWeight="bold">{userName}</Typography>}
        subheader={<Typography variant="body2" color="textSecondary">{timestamp}</Typography>}
      />
      <Divider />

      {/* Content */}
      <CardContent>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {content}
        </Typography>
        {/* Optional Media (Image/Video Placeholder) */}
        <Box
          component="img"
          src="https://via.placeholder.com/600x300" // Replace with actual image URL if available
          alt="Post content"
          sx={{
            width: "100%",
            borderRadius: "8px",
            display: content ? "block" : "none",
          }}
        />
      </CardContent>
      <Divider />

      {/* Actions */}
      <CardActions sx={{ justifyContent: "space-between", padding: "8px 16px" }}>
        <IconButton>
          <ThumbUpOutlined sx={{ color: "#1976d2" }} />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            Like
          </Typography>
        </IconButton>
        <IconButton>
          <CommentOutlined sx={{ color: "#1976d2" }} />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            Comment
          </Typography>
        </IconButton>
        <IconButton>
          <ShareOutlined sx={{ color: "#1976d2" }} />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            Share
          </Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default PostCard;
