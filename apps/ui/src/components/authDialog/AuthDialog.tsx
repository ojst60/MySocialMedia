import { useState, ReactNode } from "react";
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
  onClose: () => void;
};

function AuthDialog({ title, children, onClose }: Props): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Handles the close button
  function onCloseHandler() {
    setIsModalOpen(false);
    onClose();
  }

  return (
    <Dialog open={isModalOpen} fullWidth maxWidth="sm">
      <DialogTitle component={"h1"} variant="h4">
        {title}
      </DialogTitle>
      <IconButton
        onClick={onCloseHandler}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <Divider />
      <DialogContent> {children}</DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
