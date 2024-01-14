import { Box, Spinner, Stack } from "@chakra-ui/react";
import { QueueJob } from "../../App";
import dayjs from "dayjs";

function formatDate(datenumber?: number) {
  if (!datenumber) return "";
  return dayjs(datenumber).format("DD-MM-YY HH:mm");
}

export default function QueueJobCard(props: {
  job?: QueueJob;
  current?: boolean;
}) {
  if (!props.job) return <></>;
  return (
    <Box
      backgroundColor="white"
      borderRadius="8px"
      color="gray"
      fontSize="16"
      fontWeight="600"
      padding="8px"
    >
      <Stack direction="row" alignItems="center" gap="1rem">
        {props.current && <Spinner />}
        <Stack direction="column">
          <Stack direction="row" gap="1rem">
            <span> Nonce: {props.job?.data}</span>
            <span>
              {" "}
              Solution: {props.job?.returnvalue?.solution || "Solving..."}
            </span>
            <span> Priority: {props.job?.opts.priority}</span>
          </Stack>

          <Stack direction="row" gap="1rem">
            <span>added: {formatDate(props.job?.timestamp)}</span>
            <span>solved: {formatDate(props.job?.finishedOn)}</span>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
