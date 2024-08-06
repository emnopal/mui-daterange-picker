import React from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { isSameDay } from "date-fns";
import { DateRange, DefinedRange } from "../types";

type DefinedRangesProps = {
  setRange: (range: DateRange) => void;
  selectedRange: DateRange;
  ranges: DefinedRange[];
};

const isSameRange = (first: DateRange, second: DateRange) => {
  const { startDate: fStart, endDate: fEnd } = first;
  const { startDate: sStart, endDate: sEnd } = second;
  if (fStart && sStart && fEnd && sEnd) {
    return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd);
  }
  return false;
};

const DefinedRanges: React.FunctionComponent<DefinedRangesProps> = ({
  ranges,
  setRange,
  selectedRange,
}: DefinedRangesProps) => (
  <List>
    {ranges.map((range, idx) => (
      <ListItemButton
        key={idx}
        onClick={() => setRange(range)}
        sx={[
          isSameRange(range, selectedRange) && {
            backgroundColor: (theme) => theme.palette.primary.dark,
            color: "primary.contrastText",
            "&:hover": {
              color: "inherit",
            },
          },
        ]}
      >
        <ListItemText
          primaryTypographyProps={{
            variant: "body2",
            sx: {
              fontWeight: isSameRange(range, selectedRange) ? "bold" : "normal",
            },
          }}
        >
          {range.label}
        </ListItemText>
      </ListItemButton>
    ))}
  </List>
);

export default DefinedRanges;
