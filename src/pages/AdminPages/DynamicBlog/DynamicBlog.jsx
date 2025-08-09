import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import facebook from "../../../assets/icon/facebook.png";
import twitter from "../../../assets/icon/twitter.png";
import linkedIn from "../../../assets/icon/linkedIn.png";
import copy from "../../../assets/icon/copy .png";
import { LoadingContext } from "../../../context/LoadingContext";
import { getDynamicBlog } from "../../../services/userServices";
import { toast } from "react-toastify";

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

        <div className={`dynamic-blog-header-content`}>
          <div className="row">
            <div className="col-md-5 d-flex align-items-center">
              <img className="blog-header-image" src={blog.coverImg} alt="" />
            </div>
            <div className="col-md-7 d-flex align-items-center">
              <div className="">
                <div className="d-flex date-div mt-1">
                  <p style={{ color: "gray", width: "110px" }} className="date">
                    {blog.date}
                  </p>{" "}
                  <strong style={{ color: "gray" }} className="popular-dot">
                    .
                  </strong>{" "}
                  <p style={{ color: "gray" }} className="date">
                    10 min read
                  </p>
                </div>
                <div>
                  {blog.tag && (
                    <>
                      {blog.tag.map((data, index) => (
                        <Link to={`/blogs/tag/${data.tags}`} key={index}>
                          <button className={`tag-btn-${index + 1}`}>
                            <small>{data.tags}</small>
                          </button>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
                <div>
                  <h1 className="dynamic-blog-top-header-title">
                    {blog.blogTitle}
                  </h1>
                </div>

                <section>
                  <h6 className="share-via mt-3">Share Via:</h6>
                  <div className="d-flex flex-wrap mt-3">
                    <div
                      className="d-flex my-2 text-decoration-none pointer-cursor"
                      onClick={() =>
                        window.open(
                          `https://www.facebook.com/sharer.php?u=${window.location.href}`,
                          "Popup",
                          "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30"
                        )
                      }
                    >
                      <div className="fb-share-text-bg">
                        <p className="facebook-text px-3">FaceBook</p>
                      </div>
                      <div className="facebook-share-icon">
                        <img src={facebook} alt="" />
                      </div>
                    </div>
                    <div
                      className="d-flex m-2 text-decoration-none pointer-cursor"
                      onClick={() =>
                        window.open(
                          `https://twitter.com/intent/tweet?url=${window.location.href}`,
                          "Popup",
                          "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30"
                        )
                      }
                    >
                      <div className="twitter-share-text-bg">
                        <p className="facebook-text px-3">Twitter</p>
                      </div>
                      <div className="twitter-share-icon">
                        <img src={twitter} alt="" />
                      </div>
                    </div>
                    <div
                      className="d-flex my-2 text-decoration-none pointer-cursor"
                      onClick={() =>
                        window.open(
                          `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`,
                          "Popup",
                          "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30"
                        )
                      }
                    >
                      <div className="linkedIn-share-text-bg">
                        <p className="facebook-text px-3">LinkedIn</p>
                      </div>
                      <div className="linkedIn-share-icon">
                        <img src={linkedIn} alt="" />
                      </div>
                    </div>

                    <div
                      className="d-flex m-2 more-share-div"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setOpne(true);
                      }}
                    >
                      <div className="plus-share-text-bg">
                        <p className="copy-text px-3">Copy</p>
                      </div>
                      <div className="Plus-share-icon">
                        <img src={copy} alt="" />
                      </div>
                    </div>
                    <div className="custom-toltip">{open && <p>Copied</p>}</div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
 

      <section
        style={{ background: "#fff" }}
        className="blog-background position-relative"
      >
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
