import React, { useContext, useEffect, useState } from "react";
import "../BlogHome/BlogHome.css";
import { Link, useParams } from "react-router-dom";
import { getAllBlogs } from "../../../services/userServices";
import { LoadingContext } from "../../../context/LoadingContext";
import { toast } from "react-toastify";
import RenderParagraphsJSX from "../../../components/Common/RenderParagraphsJSX/RenderParagraphsJSX";
import { calculateReadingTime } from "../../../utils/calculateReadingTime";

const TaggedBlogs = () => {
  const { tag } = useParams();
  const formattedTag = tag.replace(/_/g, " ");
  const { setLoading } = useContext(LoadingContext);
  const [blogs, setBlogs] = useState([]);
  const reversOrder = [...blogs].reverse();

  useEffect(() => {
    handleGetAllBlogs();
  }, []);

  const handleGetAllBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogs();
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
  console.log("tag", tag);
  console.log("blogs", blogs);
  return (
    <section>
      <h5 className="text-lg secondary-black-text font-nunito m-0 mb-4">
        Tag search result- <span className="fw-semibold">{formattedTag}</span>
      </h5>
      <div className="">
        {reversOrder &&
          tag &&
          reversOrder
            .filter((article) =>
              article.tag.some(
                (t) => t.tags.toLowerCase() === formattedTag?.toLowerCase()
              )
            )
            .map((data, index) => {
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
                        <img
                          className="blog-card-img"
                          src={data.coverImg}
                          alt=""
                        />
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

export default TaggedBlogs;
