import styles from "./styles/login.module.scss";

function Login(): JSX.Element {
  return (
    <div className={styles["root-container"]}>
      <div className={styles["login-dialog"]}>
        <h2>Login to your profile</h2>
        <form></form>
      </div>
    </div>
  );
}

export default Login;
