import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register, setLoading } from "../redux/userSlice";
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
import { Link } from "react-router-dom";
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
    height: "auto",
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
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function Signup() {
  const dispatch = useDispatch();
  const styles = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async() => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const user = { username, email, password, inviteCode };
    
    try {
        dispatch(setLoading(true));
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        const data = await response.json();
        dispatch(register(data));
        notify("Registration successful!", "success");
    } catch (error) {
        setError(error.message);
        notify(error.message, "error");
    } finally {
        dispatch(setLoading(false));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && email && password && confirmPassword) {
      handleSignup();
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader
          image={<Avatar icon={<GuestRegular />} aria-label="Lock" />}
          header={<span className={styles.text}>SIGN UP</span>}
        />
        <CardPreview>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <Input
                type="text"
                appearance="underline"
                name="username"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <Input
                type="email"
                appearance="underline"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Input
                type="password"
                appearance="underline"
                name="confirm_password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <Input
                type="text"
                appearance="underline"
                name="invite_code"
                placeholder="Invite Code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <Button appearance="primary" type="submit" aria-label="Sign Up">
                Sign Up
              </Button>
            </div>
            <div className={styles.field}>
              <Link to="/login">Already have an account? Sign in</Link>
            </div>
          </form>
          {error && <div className="error-message">{error}</div>}
        </CardPreview>
      </Card>
    </div>
  );
}

export default Signup;