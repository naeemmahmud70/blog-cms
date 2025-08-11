import React, { useContext, useEffect, useState } from "react";
import "../BlogHome/BlogHome.css";
import { Link } from "react-router-dom";
import { LoadingContext } from "../../../context/LoadingContext";
import { toast } from "react-toastify";
import threeDot from "../../../assets/icon/DotsThreeVertical.png";
import edite from "../../../assets/icon/edite.png";
import archive from "../../../assets/icon/archiving.png";
import RenderParagraphsJSX from "../../../components/Common/RenderParagraphsJSX/RenderParagraphsJSX";
import { calculateReadingTime } from "../../../utils/calculateReadingTime";
import {
  deleteArchive,
  getAllArchives,
  postBlog,
} from "../../../services/userServices";
import { localDateAndTime } from "../../../utils/localtime";

const ArchivedBlogs = () => {
  const { setLoading } = useContext(LoadingContext);
  const [archives, setArchive] = useState([]);
  const reversOrder = [...archives].reverse();
  const [isPosted, setPosted] = useState(true);

  useEffect(() => {
    gettAllArchieved();
  }, [isPosted]);

  const gettAllArchieved = async () => {
    try {
      setLoading(true);
      const response = await getAllArchives();

      if (response.error) {
        toast.dismiss();
        toast.error(response?.error?.message || "Something went worng!");
      } else {
        setArchive(response);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const rePost = async (id) => {
    const archive = archives.find((data) => data._id === id);
    const fulldate = localDateAndTime();

    const fullBloglogData = {
      date: fulldate,
      coverImg: archive.coverImg,
      tag: archive.tag,
      blogTitle: archive.blogTitle,
      blogContent: archive.blogContent,
    };
    try {
      setLoading(true);
      const response = await postBlog(fullBloglogData);
      if (response.error) {
        toast.dismiss();
        toast.error(response?.error?.message || "Something went worng!");
      } else {
        deleteArchives(id);
        toast.success("Re-posted successfully!");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  //Deleting archive post
  const deleteArchives = async (id) => {
    try {
      setLoading(true);
      const response = await deleteArchive(id);
      if (response.error) {
        toast.dismiss();
        toast.error(response?.error?.message || "Something went worng!");
      } else {
        setPosted(!isPosted);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <section>
      <h5 className="text-lg secondary-black-text font-nunito m-0 mb-4">
        Your archived articles-
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
                <div className="admin-blog-card-img-overflow">
                  <img className="blog-card-img" src={data.coverImg} alt="" />
                </div>
              </div>
              <div className="d-flex align-items-center right-side-content">
                <div className="blog-card-text">
                  <h4 className="text-lg light-black-text font-nunito fw-semibold">
                    {data.blogTitle}
                  </h4>{" "}
                  <div className="read-more-overflow secondary-light-text">
                    <RenderParagraphsJSX html={data.blogContent} />
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
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
                      <div className="blog-buttons d-flex flex-wrap gap-2 ms-3">
                        {data.tag.slice(0, 6).map((data, index) => (
                          <Link
                            to={`/admin/blogs/tag/${data.tags.replace(
                              /\s+/g,
                              "_"
                            )}`}
                            className={`tag-btn tag-btn-${index + 1}`}
                            key={index}
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
                          <button
                            className="dropdown-item"
                            onClick={() => rePost(data._id)}
                          >
                            Re-post <img src={edite} alt="" />
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => deleteArchives(data._id)}
                            className="dropdown-item"
                          >
                            Delete <img src={archive} alt="" />{" "}
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

export default ArchivedBlogs;
