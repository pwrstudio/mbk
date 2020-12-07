import { format, getYear } from "date-fns";

export const formattedDate = (start, end) => {
    if (!start) {
        return false;
    }

    const startDate = Date.parse(start);

    if (!end) {
        return format(startDate, "dd.MM.yyyy");
    }

    const endDate = Date.parse(end);

    if (format(startDate, "dd.MM.yyyy") == format(endDate, "dd.MM.yyyy")) {
        return format(startDate, "dd.MM.yyyy");
    }

    const startFormat =
        getYear(startDate) == getYear(endDate) ? "dd.MM" : "dd.MM.yyyy";
    const endFormat = "dd.MM.yyyy";

    return format(startDate, startFormat) + " – " + format(endDate, endFormat);
};
