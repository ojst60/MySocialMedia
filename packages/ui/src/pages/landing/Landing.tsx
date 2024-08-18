import Logo from "../../assets/images/logo.jpeg";
import styles from "./styles/landing.module.scss";

function Landing(): JSX.Element {
  return (
    <div className={styles["root-container"]}>
      <div className={styles["logo-container"]}>
        <img src={Logo} className={styles.logo} />
      </div>
      <div className={styles['main-container']}>
        <div className={styles.content}>
          <h2>Join the gist</h2>
          <h4>Join today</h4>

          <button>Create an account</button>

          <p>Already have an account ?</p>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
