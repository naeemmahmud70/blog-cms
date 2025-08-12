import React, { useContext, useEffect, useState } from "react";
import "./BlogHome.css";
import { Link } from "react-router-dom";
import {
  getAllBlogs,
  handleArchive,
  postArchive,
} from "../../../services/userServices";
import { LoadingContext } from "../../../context/LoadingContext";
import { toast } from "react-toastify";
import { localDateAndTime } from "../../../utils/localtime";
import threeDot from "../../../assets/icon/DotsThreeVertical.png";
import edite from "../../../assets/icon/edite.png";
import archive from "../../../assets/icon/archiving.png";
import RenderParagraphsJSX from "../../../components/Common/RenderParagraphsJSX/RenderParagraphsJSX";
import { calculateReadingTime } from "../../../utils/calculateReadingTime";

const BlogHome = () => {
  const { setLoading } = useContext(LoadingContext);
  const [blogs, setBlogs] = useState([]);
  const reversOrder = [...blogs].reverse();
  const [isArcive, setArchive] = useState(true);

  useEffect(() => {
    handleGetAllBlogs();
  }, [isArcive]);

  const handleGetAllBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogs();
      if (response.status == 200) {
        setBlogs(response?.data?.articles);
      } else {
        toast.dismiss();
        toast.error(response?.data?.message || "Something went worng!");
      }
    } catch (error) {
      setLoading(false);
      toast.dismiss();
      toast.error(error?.message || "Something went worng!");
    }
    setLoading(false);
  };

  const handleArchives = async (id) => {
    const artcile = blogs.find((data) => data._id === id);
    if (artcile) {
      postInArchive(artcile);
    }

    try {
      setLoading(true);
      const response = await handleArchive(id);
      if (response.status == 200) {
        setArchive(!isArcive);
      } else {
        toast.dismiss();
        toast.error(response?.data?.message || "Something went worng!");
      }
    } catch (error) {
      setLoading(false);
      toast.dismiss();
      toast.error(error.message || "Something went worng!");
    }
    setLoading(false);
  };

  // posting in archive file
  const postInArchive = async (data) => {
    const fulldate = localDateAndTime();

    const fullBloglogData = {
      date: fulldate,
      coverImg: data.coverImg,
      tag: data.tag,
      blogTitle: data.blogTitle,
      blogContent: data.blogContent,
    };

    try {
      setLoading(true);
      const response = await postArchive(fullBloglogData);
      if (response.error) {
        toast.dismiss();
        toast.error(response?.error?.message || "Something went worng!");
      } else {
        toast.success("Stored in the achives!");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <section>
      <h5 className="text-lg secondary-black-text font-nunito m-0 mb-4">
        All the published articles-
      </h5>
      <div className="">
        {reversOrder.map((data, index) => {
          const isLastItem = index === reversOrder.length - 1;
          return (
            <div
              key={data?._id}
              className={`blogs-div mt-4 pb-4 ${
                !isLastItem ? "border-bottom" : ""
              }`}
            >
              <div className="left-side-content">
                <Link
                  to={`/admin/blogs/${encodeURIComponent(
                    data?.blogTitle?.replace(/\s+/g, "_")
                  )}`}
                >
                  <div className="admin-blog-card-img-overflow">
                    <img className="blog-card-img" src={data.coverImg} alt="" />
                  </div>
                </Link>
              </div>
              <div className="d-flex align-items-center right-side-content">
                <div className="blog-card-text">
                  <Link
                    to={`/admin/blogs/${encodeURIComponent(
                      data?.blogTitle?.replace(/\s+/g, "_")
                    )}`}
                    className="text-decoration-none"
                  >
                    <h4 className="text-lg light-black-text font-nunito fw-semibold">
                      {data.blogTitle}
                    </h4>{" "}
                    <div className="read-more-overflow secondary-light-text">
                      <RenderParagraphsJSX html={data.blogContent} />
                    </div>
                    <p className="blue-text text-xs-sm font-nunito">
                      Read more...
                    </p>
                  </Link>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="d-flex flex-wrap gap-3 align-items-center">
                        <p className="m-0 text-xs-sm light-black-text font-poppins">
                          {data.date}
                        </p>{" "}
                        <strong className="seperator-circle"></strong>{" "}
                        <p className="m-0 text-xs-sm light-black-text font-poppins">
                          {calculateReadingTime(data.blogContent)} min read
                        </p>
                        <strong className="seperator-circle"></strong>
                      </div>
                      <div className="d-flex flex-wrap gap-2 ms-3">
                        {data?.tag?.slice(0, 6).map((data, index) => (
                          <Link
                            key={index}
                            to={`/admin/blogs/tag/${data.tags.replace(
                              /\s+/g,
                              "_"
                            )}`}
                            className={`tag-btn tag-btn-${index + 1}`}
                          >
                            <small>{data.tags}</small>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="dropdown">
                      <button
                        className="bg-transparent p-1 border-0"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src={threeDot} alt="" />
                      </button>
                      <ul className="dropdown-menu drop-down-bg">
                        <li>
                          <Link
                            to={`/admin/blogs/blog_edit/${encodeURIComponent(
                              data?.blogTitle?.replace(/\s+/g, "_")
                            )}`}
                            style={{ textDecoration: "none" }}
                          >
                            <button className="dropdown-item">
                              Edit Article <img src={edite} alt="" />
                            </button>
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => handleArchives(data._id)}
                            className="dropdown-item"
                          >
                            Archive <img src={archive} alt="" />{" "}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BlogHome;
