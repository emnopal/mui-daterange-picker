/* eslint-disable object-curly-newline */
import React from "react";
import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { differenceInCalendarMonths, format } from "date-fns";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import Month from "./Month";
import DefinedRanges from "./DefinedRanges";
import { DateRange, DefinedRange, Setter, NavigationAction } from "../types";
import { MARKERS } from "./Markers";

interface MenuProps {
  dateRange: DateRange;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
    onApplyClick: () => void;
    onClearClick: () => void;
  };
  locale?: Locale;
}

const Menu: React.FunctionComponent<MenuProps> = (props: MenuProps) => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
    locale,
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange,
    minDate,
    maxDate,
    helpers,
    handlers,
  };

  return (
    <Paper elevation={5} square>
      <Grid container direction="row" wrap="nowrap">
        <Grid>
          <DefinedRanges selectedRange={dateRange} ranges={ranges} setRange={setDateRange} />
        </Grid>

        <Divider orientation="vertical" flexItem />

        <Grid>
          <Grid container sx={{ padding: "1em 2em" }} alignItems="center">
            <Grid item sx={{ flex: 1, textAlign: "center" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Start Date
              </Typography>
              <Typography variant="subtitle1">
                {startDate ? format(startDate, "dd MMMM yyyy", { locale }) : "dd MMMM yyyy"}
              </Typography>
            </Grid>

            <Grid item sx={{ flex: 1, textAlign: "center" }}>
              <ArrowRightAlt color="action" />
            </Grid>

            <Grid item sx={{ flex: 1, textAlign: "center" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                End Date
              </Typography>
              <Typography variant="subtitle1">
                {endDate ? format(endDate, "dd MMMM yyyy", { locale }) : "dd MMMM yyyy"}
              </Typography>
            </Grid>
          </Grid>

          <Divider />

          <Grid container direction="row" justifyContent="center" wrap="nowrap">
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
              locale={locale}
            />

            <Divider orientation="vertical" flexItem />

            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
              locale={locale}
            />
          </Grid>

          <Divider />

          <Grid container direction="row" justifyContent="center" wrap="nowrap" sx={{ my: ".5em", pr: "1em" }}>
            <Grid item sx={{ flex: 1, textAlign: "right" }} gap={1}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handlers.onClearClick}
                sx={{ mr: ".8em" }}
              >
                Clear
              </Button>
              <Button variant="contained" color="primary" size="small" onClick={handlers.onApplyClick}>
                Apply
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Menu;
