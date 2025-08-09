/* eslint-disable react/prop-types */
import React from "react";
import { calculateReadingTime } from "../../utils/calculateReadingTime";
import { Link } from "react-router-dom";
import SocialMediaShare from "../SocialMediaShare/SocialMediaShare";

const BlogHeader = ({ blog }) => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat position-relative"
      style={{
        backgroundImage: `linear-gradient(125.69deg, rgba(41, 41, 41, 0.74) 0%, rgba(25, 25, 25, 0.74) 100%), url(${blog.coverImg})`,
      }}
    >
      <div
        className={`dynamic-blog-header-content w-100 px-4 py-5 d-flex align-items-center p-4`}
      >
        <div className="row h-100">
          <div className="col-md-5 d-flex align-items-center ">
            <img className="w-100 rounded-1" src={blog.coverImg} alt="" />
          </div>
          <div className="col-md-7 d-flex align-items-center">
            <div>
              <div className="d-flex flex-wrap gap-3 align-items-center mt-4 mt-md-0">
                <p className="m-0 text-xs-sm text-white font-nunito">
                  {blog.date}
                </p>{" "}
                <strong className="seperator-circle bg-white"></strong>{" "}
                <p className="m-0 text-xs-sm text-white font-nunito">
                  {calculateReadingTime(blog.blogContent)} min read
                </p>
              </div>
              <div>
                {blog.tag && (
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {blog.tag.map((data, index) => (
                      <Link to={`/blogs/tag/${data.tags}`} key={index}>
                        <button className={`tag-btn tag-btn-${index + 1}`}>
                          <small>{data.tags}</small>
                        </button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h1 className="blog-header-title text-white font-nunito lh-1 m-0 mb-2 mt-4">
                  {blog.blogTitle}
                </h1>
              </div>
              <SocialMediaShare blog={blog} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
