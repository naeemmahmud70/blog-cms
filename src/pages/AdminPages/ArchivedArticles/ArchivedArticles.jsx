import React, { useContext, useEffect, useState } from "react";
import "../ArticlesHome/ArticlesHome.css";
import { Link, useNavigate } from "react-router-dom";
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
  postArticle,
} from "../../../services/userServices";
import { localDateAndTime } from "../../../utils/localtime";

const ArchivedArticles = () => {
  const { setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
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

      if (response.status == 200) {
        setArchive(response?.data?.archives);
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

  const rePost = async (id) => {
    const archive = archives.find((data) => data._id === id);
    const fulldate = localDateAndTime();

    const fullArchiveData = {
      date: fulldate,
      coverImg: archive.coverImg,
      tag: archive.tag,
      articleTitle: archive.articleTitle,
      articleContent: archive.articleContent,
    };
    try {
      setLoading(true);
      const response = await postArticle(fullArchiveData);
      if (response.status === 201) {
        deleteArchives(id);
        toast.success("Article re-posted successfully!");
        navigate("/admin/blogs");
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

  //Deleting archive post
  const deleteArchives = async (id, toastMessage) => {
    try {
      setLoading(true);
      const response = await deleteArchive(id);
      if (response.status == 200) {
        if (toastMessage) {
          toast.dismiss();
          toast.success(response?.data?.message);
        }
        setPosted(!isPosted);
      } else {
        toast.dismiss();
        toast.error(response?.data?.message || "Something went worng!");
      }
    } catch (error) {
      setLoading(false);
      toast.dismiss();
      toast.error(error?.message || "Something went worng!");
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
              className={`articles-div mt-4 pb-4 ${
                !isLastItem ? "border-bottom" : ""
              }`}
            >
              <div className="left-side-content">
                <div className="admin-article-card-img-overflow">
                  <img
                    className="article-card-img"
                    src={data.coverImg}
                    alt=""
                  />
                </div>
              </div>
              <div className="d-flex align-items-center right-side-content">
                <div className="">
                  <h4 className="text-lg light-black-text font-nunito fw-semibold">
                    {data.articleTitle}
                  </h4>{" "}
                  <div className="read-more-overflow secondary-light-text">
                    <RenderParagraphsJSX html={data.articleContent} />
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
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
                            onClick={() =>
                              deleteArchives(data._id, "toastMessage")
                            }
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

export default ArchivedArticles;
