import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { LoadingContext } from "../../../context/LoadingContext";
import { getDynamicArticle } from "../../../services/userServices";
import { toast } from "react-toastify";
import "./DynamicArticle.css";
import "../ArticlesHome/ArticlesHome.css";
import ArticleHeader from "../../../components/ArticleHeader/ArticleHeader";
import ArticleDetails from "../../../components/ArticleDetails/ArticleDetails";

const DynamicArticle = () => {
  const { title } = useParams();
  const [article, setArticle] = useState({});
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (title) {
      handleDynamicArticle(title?.replace(/_/g, " "));
    }
  }, [title]);

  const handleDynamicArticle = async (title) => {
    try {
      setLoading(true);
      const response = await getDynamicArticle(title);
      if (response.status == 200) {
        setArticle(response?.data?.article);
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

  return (
    <div className="position-relative">
      <section>
        <ArticleHeader article={article} />
      </section>

      <section>
        <ArticleDetails article={article} />
      </section>
    </div>
  );
};

export default DynamicArticle;
