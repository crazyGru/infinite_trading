import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, setLoading } from "../redux/userSlice";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardPreview,
  Input,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { GuestRegular } from "@fluentui/react-icons";
import { Link, useNavigate } from "react-router-dom";
import notify from "../utils/notification";

const useStyles = makeStyles({
  text: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightBold,
    lineHeight: tokens.lineHeightBase600,
  },
  card: {
    margin: "auto",
    padding: "32px",
    width: "540px",
    height: "360px",
    maxWidth: "100%",
    gap: "32px",
  },
  field: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalXXS,
    marginTop: tokens.spacingVerticalMNudge,
    padding: tokens.spacingHorizontalMNudge,
    textAlign: "center",
  },
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const styles = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Incorrect username or password");
      }

      const data = await response.json();
      dispatch(login(data));
      localStorage.setItem("token", data.access_token);
      notify("Login successful!", "success");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      notify(error.message, "error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && password) {
      handleLogin();
    } else {
      setError("Please enter both username and password.");
    }
  };

  return (
    <Card className={styles.card}>
      <CardHeader
        image={<Avatar icon={<GuestRegular />} aria-label="Guest" />}
        header={<span className={styles.text}>SIGN IN</span>}
      />
      <CardPreview>
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <Input
              type="email"
              appearance="underline"
              name="username"
              placeholder="User"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <Input
              type="password"
              appearance="underline"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <Button appearance="primary" type="submit" aria-label="Sign In">
              Sign In
            </Button>
          </div>
          <div className={styles.field}>
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </div>
        </form>
        {error && <div className="error-message">{error}</div>}
      </CardPreview>
    </Card>
  );
}

export default Login;
