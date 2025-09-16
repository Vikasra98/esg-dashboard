import moment from "moment";

export function formatDate(dateString: string) {
  if (!dateString) return "";
  return moment(dateString).format("MMMM D, YYYY [at] h:mm A");
}
