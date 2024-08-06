import React from "react";

import { Box, Popover, type PopoverProps, useTheme, useMediaQuery, Dialog } from "@mui/material";
import DateRangePicker from "./DateRangePicker";

import { type DateRange, type DefinedRange } from "../types";

type RequiredToggle = { picker?: "modal"; toggle?: () => void } | { picker: "box"; toggle: () => void };
type RequiredOnClose = { picker?: "modal"; onClose: () => void } | { picker: "box"; onClose?: () => void };

export interface DateRangePickerProps {
  open: boolean;
  initialDateRange?: DateRange;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange: (dateRange: DateRange) => void;
  closeOnClickOutside?: boolean;
  wrapperClassName?: string;
  locale?: Locale;
  modalProps?: Omit<PopoverProps, "children" | "open">;
}

export type DateRangePickerWrapperProps = DateRangePickerProps & RequiredToggle & RequiredOnClose;

const DateRangePickerWrapper: React.FunctionComponent<DateRangePickerWrapperProps> = (
  props: DateRangePickerWrapperProps
) => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  const { closeOnClickOutside, wrapperClassName, toggle, open, onClose, modalProps } = props;
  let { picker } = props;

  if (!picker) {
    picker = "modal";
  }

  const BoxDatePicker = () => {
    const handleToggle = () => {
      if (closeOnClickOutside === false) {
        return;
      }

      if (toggle) {
        toggle();
      }
    };

    const handleKeyPress = (event: any) => event?.key === "Escape" && handleToggle();

    return (
      <Box sx={{ position: "relative" }}>
        {open && (
          <Box
            sx={{
              position: "fixed",
              height: "100vh",
              width: "100vw",
              bottom: 0,
              zIndex: 0,
              right: 0,
              left: 0,
              top: 0,
            }}
            onKeyUp={handleKeyPress}
            onClick={handleToggle}
          />
        )}

        <Box sx={{ position: "relative", zIndex: 1 }} className={wrapperClassName}>
          <DateRangePicker {...props}/>
        </Box>
      </Box>
    );
  };

  const ModalDatePicker = () => {
    if (isMobileView) {
      return (
        <Dialog open={open} onClose={onClose!}>
          <DateRangePicker {...props}/>
        </Dialog>
      );
    }

    return (
      <Popover {...modalProps} open={open} onClose={onClose!}>
        <DateRangePicker {...props}/>
      </Popover>
    );
  };

  if (picker === "modal") {
    return <ModalDatePicker />;
  }

  return <BoxDatePicker />;
};

export default DateRangePickerWrapper;
