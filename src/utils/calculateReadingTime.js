export const calculateReadingTime = (html) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  const text = tempElement.textContent || tempElement.innerText || "";

  // Count words
  const wordCount = text.trim().split(/\s+/).length;

  // Average reading speed: 200 words per minute
  const readingTime = Math.ceil(wordCount / 200);

  return `${readingTime}`;
};