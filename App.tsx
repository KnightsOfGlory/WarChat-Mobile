import React from "react";
import Menu from "./src/navigation/Menu";
import KeepAlive from "./src/utilities/KeepAlive";

export default function() {

  return (
      <>
          <Menu />
          <KeepAlive />
      </>
  );
};
