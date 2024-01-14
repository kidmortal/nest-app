import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";
import { When } from "./components/When";
import QueueJobCard from "./components/QueueJobCard";
import { Stack, Text } from "@chakra-ui/react";

export type QueueJob = {
  id: number;
  finishedOn: number;
  timestamp: number;
  data: number;
  returnvalue?: {
    solution: number;
  };
  opts: {
    priority: number;
  };
};

type QueueUpdateResponse = {
  active: QueueJob[];
  complete: QueueJob[];
  waiting: QueueJob[];
};

function App() {
  const [active, setActive] = useState<QueueJob | undefined>(undefined);
  const [pending, setPending] = useState<QueueJob[]>([]);
  const [complete, setComplete] = useState<QueueJob[]>([]);

  useEffect(() => {
    socket?.on("queue_update", (data: QueueUpdateResponse) => {
      console.log(data.complete);
      setActive(data.active[0]);
      setPending(data.waiting);
      setComplete(data.complete);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "3rem",
        gap: "3rem",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Stack direction="column" gap="0.5rem" minWidth="25rem">
        <Text fontSize="3xl">Pending jobs</Text>
        {pending.map((pendingJob) => (
          <QueueJobCard job={pendingJob} />
        ))}
      </Stack>
      <Stack direction="column" minWidth="25rem">
        <Text fontSize="3xl">Processing job</Text>
        <When value={active} fallback={<span>No active job</span>}>
          <QueueJobCard job={active} current />
        </When>
      </Stack>
      <Stack direction="column" gap="0.5rem" minWidth="25rem">
        <Text fontSize="3xl">Completed jobs</Text>
        {complete.map((completeJob) => (
          <QueueJobCard job={completeJob} />
        ))}
      </Stack>
    </div>
  );
}

export default App;
