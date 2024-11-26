import { useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  title: string;
  children: ReactNode;
};

function AuthDialog({ title, children }: Props): JSX.Element {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Handles the close button
  function onCloseHandler() {
    setIsModalOpen(false);
    navigate("/");
  }

  return (
    <Dialog
      open={isModalOpen}
      onClose={onCloseHandler}
      fullWidth
      maxWidth="sm"
      sx={{
        ".MuiPaper-root": {
          borderRadius: "16px",
          padding: "16px",
          boxShadow: 8,
        },
      }}
    >
      <DialogTitle
        component="h1"
        variant="h5"
        sx={{
          fontWeight: 600,
          textAlign: "center",
          marginBottom: 1,
        }}
      >
        {title}
        <IconButton
          onClick={onCloseHandler}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider sx={{ marginBottom: 2 }} />
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          padding: 3,
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
