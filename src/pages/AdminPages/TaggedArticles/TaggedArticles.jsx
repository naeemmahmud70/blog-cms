import React, { useContext, useEffect, useState } from "react";
import "../ArticlesHome/ArticlesHome.css";
import { Link, useParams } from "react-router-dom";
import { getAllArticles } from "../../../services/userServices";
import { LoadingContext } from "../../../context/LoadingContext";
import { toast } from "react-toastify";
import RenderParagraphsJSX from "../../../components/Common/RenderParagraphsJSX/RenderParagraphsJSX";
import { calculateReadingTime } from "../../../utils/calculateReadingTime";

const TaggedArticles = () => {
  const { tag } = useParams();
  const formattedTag = tag.replace(/_/g, " ");
  const { setLoading } = useContext(LoadingContext);
  const [articles, setArticles] = useState([]);
  const reversOrder = [...articles].reverse();

  useEffect(() => {
    handlegetAllArticles();
  }, []);

  const handlegetAllArticles = async () => {
    try {
      setLoading(true);
      const response = await getAllArticles();
      if (response.status == 200) {
        setArticles(response?.data?.articles);
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
                  className={`articles-div mt-4 pb-4 ${
                    !isLastItem ? "border-bottom" : ""
                  }`}
                >
                  <div className="left-side-content">
                    <Link
                      to={`/admin/blogs/${encodeURIComponent(
                        data?.articleTitle?.replace(/\s+/g, "_")
                      )}`}
                    >
                      <div className="admin-article-card-img-overflow">
                        <img
                          className="article-card-img"
                          src={data.coverImg}
                          alt=""
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="d-flex align-items-center right-side-content">
                    <div className="">
                      <Link
                        to={`/admin/blogs/${encodeURIComponent(
                          data?.articleTitle?.replace(/\s+/g, "_")
                        )}`}
                        className="text-decoration-none"
                      >
                        <h4 className="text-lg light-black-text font-nunito fw-semibold">
                          {data.articleTitle}
                        </h4>{" "}
                        <div className="read-more-overflow secondary-light-text">
                          <RenderParagraphsJSX html={data.articleContent} />
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
                              {calculateReadingTime(data.articleContent)} min read
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

export default TaggedArticles;
