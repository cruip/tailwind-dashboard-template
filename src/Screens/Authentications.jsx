import Login from "../components/Login/Login";
import classes from "./Authentication.module.css";
import SignUp from "../components/Login/SignUp";
import { useState } from "react";
const Authentication = () => {
  const [switchAccount, setSwitchAccount] = useState(false);

  function setSwitchAccountHandler() {
    setSwitchAccount(!switchAccount);
  }
  return (
    <div className={classes.Authentication}>
      <div className={classes.login}>
        {switchAccount ? (
          <Login signUpHandler={setSwitchAccountHandler} />
        ) : (
          <SignUp signUpHandler={setSwitchAccountHandler} />
        )}
      </div>
      <div className={classes.image}>
        <img
          src="https://eskipaper.com/images/volkswagen-bus-toy-road-1.jpg"
          alt="bus-walking"
        />
      </div>
    </div>
  );
};

export default Authentication;
