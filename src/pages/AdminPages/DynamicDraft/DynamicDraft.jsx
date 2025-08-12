import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { LoadingContext } from "../../../context/LoadingContext";
import { getDynamicDraft } from "../../../services/userServices";
import { toast } from "react-toastify";
import "../DynamicBlog/DynamicBlog.css";
import "../BlogHome/BlogHome.css";
import BlogDetails from "../../../components/BlogDetails/BlogDetails";
import BlogHeader from "../../../components/BlogHeader/BlogHeader";

const DynamicDraft = () => {
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
      const response = await getDynamicDraft(title);

      if (response.status == 200) {
        setBlog(response?.data?.draft);
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
        <BlogHeader blog={blog} />
      </section>

      <section>
        <BlogDetails blog={blog} />
      </section>
    </div>
  );
};

export default DynamicDraft;
