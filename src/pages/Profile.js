import React, { useEffect } from "react";
import { Avatar, makeStyles, tokens } from "@fluentui/react-components";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "50px 20px",
    rowGap: "20px",
  },
  panels: {
    padding: "0 10px",
    "& th": {
      textAlign: "left",
      padding: "0 30px 0 0",
    },
  },
  propsTable: {
    "& td:first-child": {
      fontWeight: tokens.fontWeightSemibold,
    },
    "& td": {
      padding: "0 30px 0 0",
    },
  },
});

function Profile() {
  const dispatch = useDispatch();
  const styles = useStyles();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userInfo = {};
      dispatch(login({ userInfo, token }));
    }
  }, [dispatch]);

  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo);

  return (
    <profile>
      <div className="info_container">
        <Avatar
          active="active"
          color="colorful"
          name={"aaa"}
          aria-label="user"
          size={96}
          activeAppearance="ring-shadow"
        />
        <div className="personal_profile">
          <table className={styles.propsTable}>
            <tbody>
              <tr>
                <td>User Name</td>
                <td>{userInfo?.username}</td>
              </tr>
              <tr>
                <td>E-mail</td>
                <td>68F / 20C</td>
              </tr>
              <tr>
                <td>VIP Level</td>
                <td>Overcast</td>
              </tr>
              <tr>
                <td>Visibility</td>
                <td>0.5 miles, 1800 ft runway visual range</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </profile>
  );
}

export default Profile;
