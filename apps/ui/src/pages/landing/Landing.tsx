import Logo from "../../assets/images/logo.jpeg";
import styles from "./styles/landing.module.scss";
import { Outlet, useNavigate } from "react-router-dom";

function Landing(): JSX.Element {
  const navigate = useNavigate();

  function onLoginHandler() {
    navigate("/login");
  }

  function onSignUpHandler() {
    navigate("/register");
  }

  return (
    <div className={styles["root-container"]}>
      <div className={styles["logo-container"]}>
        <img src={Logo} className={styles.logo} />
      </div>
      <div className={styles["main-container"]}>
        <div className={styles.content}>
          <h2>Join the gist</h2>
          <h4>Join today</h4>

          <button onClick={onSignUpHandler}>Create an account</button>

          <p>Already have an account ?</p>
          <button onClick={onLoginHandler}>Login</button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Landing;
