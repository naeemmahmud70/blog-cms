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

const BlogHome = () => {
  const { setLoading } = useContext(LoadingContext);
  const [blogs, setBlogs] = useState([]);
  const reversOrder = [...blogs].reverse();
  const [isArcive, setArchive] = useState(true);

  useEffect(() => {
    handleGetAllBlogs();
  }, []);

  const handleGetAllBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogs();
      // console.log(response);

      if (response.error) {
        toast.dismiss();
        toast.error(response?.error?.message || "Something went worng!");
      } else {
        setBlogs(response);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleArchives = async (id) => {
    const artcile = blogs.find((data) => data._id === id);
    postInArchive(artcile);
    try {
      setLoading(true);
      const response = await handleArchive(id);

      if (response.error) {
        toast.dismiss();
        toast.error(response?.error?.message || "Something went worng!");
      } else {
        setArchive(!isArcive);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
        toast.success("Stored In Achive File");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  console.log("blogData", blogs);

  return (
    <section>
      <h5 className="text-lg secondary-black-text font-nunito m-0 mb-4">
        All the published articles-
      </h5>
      <div className="">
        {reversOrder.map((data) => (
          <div key={data?._id} className="row blogs-div m-0 mt-4 pb-4">
            <div className="col-lg-3 col-md-4 col-sm-12 d-flex">
              <Link
                to={`/dashboard/blogs/${data._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="admin-blog-card-img-overflow">
                  <img className="blog-card-img" src={data.coverImg} alt="" />
                </div>
                <div className="mobile-blogs-img">
                  <img className="" src={data.coverImg} alt="" />
                </div>
              </Link>
            </div>
            <div className="col-lg-9 col-md-8 p-0 col-sm-12 d-flex align-items-center">
              <div className="blog-card-text">
                <Link
                  to={`/admin/blogs/blog_edit/${data._id}`}
                  className="text-decoration-none"
                >
                  <h4 className="text-lg light-black-text font-nunito fw-semibold">
                    {data.blogTitle}
                  </h4>{" "}
                  <div className="read-more-overflow secondary-light-text">
                    <RenderParagraphsJSX html={data.blogContent} />
                  </div>
                  <p className="blog-read-more">Read more...</p>
                </Link>

                <div className="d-flex justify-content-between align-itemsw-center">
                  <div className="d-flex align-items-center">
                    <div className="d-flex gap-3 align-items-center">
                      <p className="m-0">{data.date}</p>{" "}
                      <strong style={{ color: "gray" }} className="">
                        .
                      </strong>{" "}
                      <p className="m-0">10 min read</p>
                      <strong className="fw-bold">.</strong>{" "}
                    </div>
                    <div className="blog-buttons d-flex gap-2 ms-3">
                      {data.tag.slice(0, 6).map((data, index) => (
                        <button className={`tag-btn-${index + 1}`} key={index}>
                          <small>{data.tags}</small>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="dropdown">
                    <button
                      className="drop-down-btn"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={threeDot} alt="" />
                    </button>
                    <ul id="drop-down-bg" className="dropdown-menu">
                      <li>
                        <Link
                          to={`/admin/blogs/blog_edit/${data._id}`}
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
        ))}
      </div>
    </section>
  );
};

export default BlogHome;
