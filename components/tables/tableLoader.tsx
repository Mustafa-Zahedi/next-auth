import { Skeleton, Paper } from "@mantine/core";

interface Props {
  visible: boolean;
  rowNumber?: number;
  colNumber?: number;
}

export default function TableLoader({
  visible,
  colNumber = 4,
  rowNumber = 5,
}: Props) {
  const style = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    backdropFilter: "blur(5px)",
    zIndex: 9999,
    display: visible ? "flex" : "none",
  };

  return (
    <div style={style}>
      <div
        style={{
          flexDirection: "column",
          height: "100%",
          position: "relative",
          width: "100%",
        }}
      >
        {/* <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>
        <Skeleton animate height={40} width={200} visible={true} />
      </h1> */}
        <Paper p="md" style={{ flex: "1", overflow: "auto" }}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                {Array.from(Array(colNumber).keys()).map((index) => (
                  <th key={index}>
                    <Skeleton animate height={30} width={150} visible={true} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from(Array(rowNumber).keys()).map((index) => (
                <tr key={index}>
                  {Array.from(Array(colNumber).keys()).map((index) => (
                    <td key={index}>
                      <Skeleton
                        animate
                        height={30}
                        width={150}
                        visible={true}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </div>
    </div>
  );
}
