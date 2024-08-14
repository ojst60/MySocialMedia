type ButtonI = {
  label: string;
  type: "primary" | "secondary";
  onClick: () => void;
};

function Button({ label, type, onClick }: ButtonI) {
  return <button onClick={onClick}>{label}</button>;
}


export default Button 