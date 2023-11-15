export const scrollToMeetings = () => {
  const element = document.getElementById("calendar-events");
  if (element) element.scrollIntoView({ block: "end", behavior: "smooth" });
};
export const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ block: "end", behavior: "smooth" });
};
