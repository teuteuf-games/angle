import CopyToClipboard from "react-copy-to-clipboard";
import React, { useMemo } from "react";
import { toast } from "react-toastify";
import Button from '@mui/material/Button';
import { DateTime } from "luxon";

const FIRST_DAY_OF_ANGLE = DateTime.fromFormat('June 21 2022', 'LLLL dd yyyy');


export function Share({ win, guesses, attempts, end, dayString}) {
  const shareText = useMemo(() => {
    const currentDate = DateTime.fromFormat(dayString, "yyyy-MM-dd");
    const diffInDays = currentDate.diff(FIRST_DAY_OF_ANGLE, 'days').toObject().days;
    const shareString = "TEST";
    return shareString
  }, [guesses, attempts, dayString, win]);

  return (
    <CopyToClipboard
      text={shareText}
      onCopy={() => toast("Copied Results to Clipboard", { autoClose: 2000 })}
      options={{ format: "text/plain" }}
    >
      <Button variant="contained" disabled={!end}><span>Share Score</span></Button>
    </CopyToClipboard>
  )
}