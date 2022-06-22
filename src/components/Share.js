import CopyToClipboard from "react-copy-to-clipboard";
import React, { useMemo } from "react";
import { toast } from "react-toastify";
import Button from '@mui/material/Button';
import { DateTime } from "luxon";
import { MAX_GUESSES } from "../constants";

const FIRST_DAY_OF_ANGLE = DateTime.fromFormat('June 21 2022', 'LLLL dd yyyy');


const getShareString = (win, guesses) => {
  let string = "";
  if (win) {
    string += `${guesses.length}/${MAX_GUESSES}\n`;
  } else {
    string += `X/${MAX_GUESSES}\n`;
  }

  for (const guess of guesses) {
    if (guess.delta > 0) {
      string += "⬇️";
    } else if (guess.delta < 0) {
      string += "⬆️";
    } else if (guess.delta === 0) {
      string += "🎉";
    }

  }
  return string;
}

export function Share({ win, guesses, attempts, end, dayString}) {
  const shareText = useMemo(() => {
    const currentDate = DateTime.fromFormat(dayString, "yyyy-MM-dd");
    const diffInDays = currentDate.diff(FIRST_DAY_OF_ANGLE, 'days').toObject().days;
    let shareString = `#Angle #${diffInDays} `;
    shareString += getShareString(win, guesses);
    shareString += "\nhttps://www.angle.wtf";
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

