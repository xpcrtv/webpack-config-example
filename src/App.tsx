import React, { useEffect } from "react";

import "antd/dist/antd.css";

import s from "./App.module.scss";
import { Button } from "antd";

import ClientIconSrc, { ReactComponent as ClientIcon } from "./clientIcon.svg";

const App = () => {
  return (
    <div className={s.title}>
      <p> Hello!!!</p>
      <div>
        <Button>Button</Button>{" "}
      </div>
      <div>
        <ClientIcon />
      </div>
      <img src={ClientIconSrc} alt="" />
    </div>
  );
};

export default App;
