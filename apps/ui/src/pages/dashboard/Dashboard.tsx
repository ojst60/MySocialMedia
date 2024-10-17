import { Button } from "@mui/material";
import { useUiSelector } from "../../redux/hooks";
import { fetchapi } from "../../services/apis/fetchAPI";
import { useUiDispatch } from "../../redux/hooks";
import { logout } from "../../redux/slices/authSlice";

function Dashboard(): JSX.Element {
  const username = useUiSelector((state) => state.auth.username);
  const dispatch = useUiDispatch();

  async function logoutHandler() {
    const res = await fetchapi({ method: "POST", url: "auth/logout" });

    if (!res.error) {
      dispatch(logout());
    }
  }

  return (
    <div>
      <div>Welcome to your dashboard, {username}</div>
      <Button onClick={logoutHandler}>Log out</Button>
    </div>
  );
}

export default Dashboard;
