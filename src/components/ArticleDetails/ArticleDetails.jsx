/* eslint-disable react/prop-types */
import React from "react";

const ArticleDetails = ({ article }) => {
  return (
    <div className="bg-white position-relative mt-5">
      {article?.articleContent && (
        <div
          className="main-article-content"
          dangerouslySetInnerHTML={{
            __html: article?.articleContent,
          }}
        />
      )}
    </div>
  );
};

export default ArticleDetails;
