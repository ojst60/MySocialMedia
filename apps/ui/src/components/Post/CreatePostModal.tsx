import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
  Box,
  Divider,
} from "@mui/material";



function CreatePostModal(): JSX.Element {
  return (
    <Dialog open={true} onClose={() => console.log("close")}>
      <DialogTitle sx={{ textAlign: "center" }}>Create Post</DialogTitle>
      <DialogContent>
        <Box>
          <TextareaAutosize></TextareaAutosize>
          <Divider />
          <Box></Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePostModal;
