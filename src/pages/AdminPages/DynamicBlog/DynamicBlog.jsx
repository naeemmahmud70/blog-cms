import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { LoadingContext } from "../../../context/LoadingContext";
import { getDynamicBlog } from "../../../services/userServices";
import { toast } from "react-toastify";
import "./DynamicBlog.css";
import "../BlogHome/BlogHome.css";
import { calculateReadingTime } from "../../../utils/calculateReadingTime";
import SocialMediaShare from "../../../components/SocialMediaShare/SocialMediaShare";

const DynamicBlog = () => {
  const { title } = useParams();
  const [blog, setBlog] = useState({});
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (title) {
      handleDynamicBlog(title?.replace(/_/g, " "));
    }
  }, [title]);

  const handleDynamicBlog = async (title) => {
    try {
      setLoading(true);
      const response = await getDynamicBlog(title);

      if (response.error) {
        toast.dismiss();
        toast.error(response?.error?.message || "Something went worng!");
      } else {
        setBlog(response);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="position-relative">
      <section
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
      </section>

      <section className="bg-white position-relative mt-5">
        {blog.blogContent && (
          <div
            className="main-blog-content"
            dangerouslySetInnerHTML={{
              __html: blog.blogContent,
            }}
          />
        )}
      </section>
    </div>
  );
};

export default DynamicBlog;
