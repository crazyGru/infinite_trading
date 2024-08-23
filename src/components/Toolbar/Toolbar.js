import React from "react";
import { Link } from "react-router-dom";
import "./Toolbar.css";
import { Home20Filled } from "@fluentui/react-icons";
import { Person20Filled } from "@fluentui/react-icons";
import { AppsList20Filled } from "@fluentui/react-icons";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <Link to="/dashboard" className="toolbar-item">
        <Home20Filled />
      </Link>
      <Link to="/about" className="toolbar-item">
        <AppsList20Filled />
      </Link>
      <Link to="/profile" className="toolbar-item">
        <Person20Filled />
      </Link>
    </div>
  );
};

export default Toolbar;
