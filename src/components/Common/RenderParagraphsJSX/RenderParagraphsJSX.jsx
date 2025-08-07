import React, { useMemo } from "react";

// eslint-disable-next-line react/prop-types
const RenderParagraphsJSX = ({ html }) => {
  const paragraphs = useMemo(() => {
    if (!html) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return Array.from(doc.querySelectorAll("p"))
      .filter((p) => p.textContent.trim() !== "")
      .map((p, index) => <p key={index}>{p.textContent}</p>);
  }, [html]);

  return (
    <div className="light-black-text font-nunito opacity-75">{paragraphs}</div>
  );
};

export default RenderParagraphsJSX;
