import { Card, CardHeader, CardContent, Box } from "@mui/material";
import user from "./num1.jpg";

function PostCard(): JSX.Element {
  return (
    <Card>
      <CardHeader sx={{ display: "flex", flexFlow: "row nowrap" }}>
        <Box
          component={"img"}
          src={user}
          sx={{
            height: "40px",
            width: "40px",
            borderRadius: "50%",
          }}
        />
        <Box component="div" sx={{ flexGrow: 1, display:"flex", flexDirection: "column" }}>

        </Box>
        <Box></Box>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}

export default PostCard;
