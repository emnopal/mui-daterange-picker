# MUI DateRange Picker

A react date range picker implementation using @mui (v5).

<a href='https://www.npmjs.com/package/mui-daterange-picker'>
    <img src='https://img.shields.io/npm/v/mui-daterange-picker.svg' alt='Latest npm version'>
</a>

## Preview

![Screenshot](/screenshot.png?raw=true "Screenshot")

## Live Demo

Check out the project running [here](https://codesandbox.io/s/mui-daterange-picker-playground-for-pb-r9rmn?file=/src/App.js)!

## Usage

```bash
npm install mui-daterange-picker --save

# or with yarn
yarn add mui-daterange-picker
```

## Basic example
```tsx
import React from "react";
import { DateRangePicker, DateRange } from "mui-daterange-picker";

type Props = {}

const App: React.FunctionComponent<Props> = props => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange>({});

  const toggle = () => setOpen(!open);

  return (
    <DateRangePicker
      open={open}
      toggle={toggle}
      onChange={(range) => setDateRange(range)}
    />
  );
}

export default App;
```

## Types
```ts
interface DateRange {
    startDate?: Date,
    endDate?: Date
}

interface DefinedRange {
    label: string,
    startDate: Date,
    endDate: Date
}
```

## Props

Name | Type                      | Required | Default value | Description
:--- |:--------------------------| :--- | :--- | :---
`open` | `Boolean`     | _required_ | - | boolean to show / hide the DateRangePicker
`picker` | `modal \| box \| undefined`     | _optional_ | `modal` | boolean to show / hide the DateRangePicker ` 
`onChange` | `(DateRange) => void`     | _required_ | - | handler function for providing selected date range
`toggle` | `() => void`              | modal: _optional_ <br/> box: _required_ | - | function to show / hide the DateRangePicker ` 
`onClose` | `() => void`              | modal: _required_ <br/> box: _optional_ | - | function to handle closing the DateRangePicker `
`initialDateRange` | `DateRange`               | _optional_ | `{}` | initially selected date range
`minDate` | `Date` or `string`        | _optional_ | 1 year  ago | min date allowed in range
`maxDate` | `Date` or `string`        | _optional_ | now | max date allowed in range
`definedRanges` | `DefinedRange[]`          | _optional_ | - | custom defined ranges to show in the list
`closeOnClickOutside` | `boolean`                 | _optional_ | `true` | defines if DateRangePicker will be closed when clicking outside of it
`wrapperClassName` | `object`                  | _optional_ | `undefined` | defines additional wrapper style classes
`locale` | `Locale`  (from date-dns) | _optional_ | `undefined` | defines locale to use (from date-fns package)
`modalProps` | `PopoverProps`  (from @mui/material) | _optional_ | `undefined` | defines additional props for the modal (from @mui/material)

## Made possible by

<a href="https://github.com/ricard33/mui-daterange-picker/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=ricard33/mui-daterange-picker" />
</a>
