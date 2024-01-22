import React from "react";

export default function StaticRow({ row }: any) {
  return (
    <div style={{ width: "100%" }}>
      {row.columns?.map((col: any) => (
        <td key={col?.content}>{col?.content}</td>
      ))}
    </div>
  );
}
