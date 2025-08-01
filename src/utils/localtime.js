export const postedLocalTime = () => {
  // get local time
  let day = new Date().toLocaleString("en-US", {
    day: "2-digit",
  });
  let month = new Date().toLocaleString("en-US", {
    month: "long",
  });
  const year = new Date().getFullYear();
  const fullDate = `${day} ${month}, ${year}`;
  return fullDate;
};