/* eslint-disable react/prop-types */
import React from "react";

const BlogDetails = ({ blog }) => {
  return (
    <div className="bg-white position-relative mt-5">
      {blog?.blogContent && (
        <div
          className="main-blog-content"
          dangerouslySetInnerHTML={{
            __html: blog?.blogContent,
          }}
        />
      )}
    </div>
  );
};

export default BlogDetails;
