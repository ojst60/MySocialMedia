import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";

function CreatePost(): JSX.Element {
  return (
    <Card sx={{ border: "1px solid #E0E0E0" }}>
      <CardHeader
        title="Post Something"
        sx={{ maxHeight: "20px", fontSize: "1.2rem" }}
      />
      <CardActionArea>
        <TextField
          placeholder="What's on your mind ?"
          variant="filled"
          size="small"
          sx={{
            width: "100%",
            borderRadius: "12px",
            caretColor: "transparent",
            cursor: "hidden",
            "& .MuiInputBase-input": {
              caretColor: "transparent", // Hides the cursor
            },
          }}
          onClick={() => {
            console.log("Is clicked");
          }}
        />
      </CardActionArea>
    </Card>
  );
}

export default CreatePost;
