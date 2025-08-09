import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import facebook from "../../../assets/icon/facebook.png";
import twitter from "../../../assets/icon/twitter.png";
import linkedIn from "../../../assets/icon/linkedIn.png";
import copy from "../../../assets/icon/copy .png";
import { LoadingContext } from "../../../context/LoadingContext";
import { getDynamicBlog } from "../../../services/userServices";
import { toast } from "react-toastify";
import "./DynamicBlog.css";
import "../BlogHome/BlogHome.css";
import { calculateReadingTime } from "../../../utils/calculateReadingTime";

const DynamicBlog = () => {
  const { title } = useParams();
  const [blog, setBlog] = useState({});
  const { setLoading } = useContext(LoadingContext);
  const [open, setOpne] = useState(false);

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

  useEffect(() => {
    setTimeout(() => {
      setOpne(false);
    }, 1000);
  }, [open]);
  

  return (
    <div className="position-relative">
      <section
        className={`dynamic-blog-header-bg`}
        style={{
          backgroundImage: `linear-gradient(125.69deg, rgba(41, 41, 41, 0.74) 0%, rgba(25, 25, 25, 0.74) 100%), url(${blog.coverImg})`,
        }}
      ></section>

      <div
        className={`dynamic-blog-header-content d-flex align-items-center p-4`}
      >
        <div className="row h-100">
          <div className="col-md-5 d-flex align-items-center ">
            <img className="w-100 rounded-1" src={blog.coverImg} alt="" />
          </div>
          <div className="col-md-7 d-flex align-items-center">
            <div>
              <div className="d-flex flex-wrap gap-3 align-items-center">
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
                <h1 className="text-white text-4xl font-nunito lh-1 m-0 mb-2 mt-4">
                  {blog.blogTitle}
                </h1>
              </div>

              <section>
                <h6 className="text-white text-md font-nunito mt-4">
                  Share Via:
                </h6>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <div
                    className="d-flex gap-2 align-items-center px-3 py-1 text-decoration-none pointer-cursor rounded-1 bg-white cursor-pointer"
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer.php?u=${window.location.href}`,
                        "Popup",
                        "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30"
                      )
                    }
                  >
                    <p className="text-sm font-nunito m-0 lh-sm">FaceBook</p>
                    <img src={facebook} alt="facebook" width={25} height={25} />
                  </div>

                  <div
                    className="d-flex gap-2 align-items-center px-3 py-1 text-decoration-none pointer-cursor rounded-1 bg-white cursor-pointer"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${window.location.href}`,
                        "Popup",
                        "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30"
                      )
                    }
                  >
                    <p className="text-sm font-nunito m-0 lh-sm">Twitter</p>

                    <img src={twitter} alt="twitter" width={25} height={25} />
                  </div>
                  <div
                    className="d-flex gap-2 align-items-center px-3 py-1 text-decoration-none pointer-cursor rounded-1 bg-white cursor-pointer"
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`,
                        "Popup",
                        "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30"
                      )
                    }
                  >
                    <p className="text-sm font-nunito m-0 lh-sm">LinkedIn</p>
                    <img src={linkedIn} alt="linkedIn" width={25} height={25} />
                  </div>

                  <div
                    className="d-flex gap-2 align-items-center px-3 py-1 text-decoration-none rounded-1 bg-transparent border cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setOpne(true);
                    }}
                  >
                    <p className="text-sm text-white font-nunito m-0 lh-sm">Copy</p>
                    <img src={copy} alt="copy" width={25} height={25} />
                  </div>
                  <div className="custom-toltip text-poppins">{open && <p>Copied</p>}</div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white position-relative">
        <div className="">
          <div className="">
            <div className="">
              <div className="main-blog-content mt-5">
                <div className="d-flex justify-content-center blog-spacing-right ">
                  <div className="focci-sdk-container">
                    <div>
                      {blog.blogContent && (
                        <div
                          className="main-blog-text secondary-dark-text"
                          dangerouslySetInnerHTML={{
                            __html: blog.blogContent,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DynamicBlog;
