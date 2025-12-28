/* eslint-disable no-unused-vars */
export const FormatDate = (date) => {
  try {
    const _date = new Date(date);
    if (isNaN(_date.getTime())) {
      return "Invalid Date";
    }
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(_date);
    return formattedDate;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

export const getRelativeTime = (date) => {
  try {
    const _date = new Date(date);
    const now = new Date();
    const seconds = Math.floor((now - _date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + " year" + (interval > 1 ? "s" : "") + " ago";

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + " month" + (interval > 1 ? "s" : "") + " ago";

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + " day" + (interval > 1 ? "s" : "") + " ago";

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + " hour" + (interval > 1 ? "s" : "") + " ago";

    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + " minute" + (interval > 1 ? "s" : "") + " ago";

    return Math.floor(seconds) + " second" + (seconds > 1 ? "s" : "") + " ago";
  } catch (error) {
    return "Just now";
  }
};
