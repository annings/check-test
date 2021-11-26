import React from "react";
import ReactDOM from "react-dom";
import { default as Checkbox } from "rc-checkbox";

const render = (Component: React.ReactElement) => {
  ReactDOM.render(Component, document.getElementById("app"));
};

render(<Checkbox />);
