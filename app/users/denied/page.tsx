import { Title } from "@mantine/core";
import React from "react";

export default function Denied() {
  return (
    <div>
      <Title c={"red.6"} ff={"sans-serif"}>
        Only subcired users can have access to this page!
      </Title>
    </div>
  );
}
