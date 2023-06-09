import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePicker = ({ value, handleSelect }) => {
  return (
    <DateRange
      ranges={[value]}
      onChange={handleSelect}
      rangeColors={["#f43f5e"]}
      date={value.starDate}
      direction="vertical"
      showDateDisplay={false}
      minDate={value.starDate}
      maxDate={value.endDate}
    />
  );
};

export default DatePicker;
