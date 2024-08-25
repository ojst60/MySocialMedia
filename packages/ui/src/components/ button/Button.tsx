import { Button as BaseButton } from "@restart/ui";

type ButtonI = {
  label: string;
  type: "primary" | "secondary";
  onClick: () => void;
};

function Button({ label, type, onClick }: ButtonI) {
  return <BaseButton onClick={onClick}>{label}</BaseButton>;
}

export default Button;
