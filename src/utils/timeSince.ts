export function timeSince(date: number) {
  console.log("___________________")
  console.log(date)
  console.log(new Date().getTime())
  console.log(new Date().getTime() - date / 1000)
  console.log("___________________")
  const seconds = Math.floor((new Date().getTime() - date) / 1000);
  if (seconds > 86400 && seconds < 604800) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
  }
  if (seconds > 3600 && seconds < 86400) {
    return `${Math.floor(seconds / 3600)}h`;
  }
  if (seconds > 60 && seconds < 3600) {
    return `${Math.floor(seconds / 60)}m`;
  }
  if (seconds < 60) {
    return "now";
  }
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
