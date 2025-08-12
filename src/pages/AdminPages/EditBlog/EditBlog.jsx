import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingContext } from "../../../context/LoadingContext";
import { getDynamicBlog, updateBlog } from "../../../services/userServices";
import { toast } from "react-toastify";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { getLocalTime, localDateAndTime } from "../../../utils/localtime";
import { generateImageUrl } from "../../../services/imageUpload";
import { selectLocalImage } from "../../../utils/selectLocalImage";
import arrow from "../../../assets/icon/left-arrow.png";
import selectImg from "../../../assets/icon/select-img.png";
import dateIcon from "../../../assets/icon/date.png";
import timeIcon from "../../../assets/icon/time.png";
import plus from "../../../assets/icon/plus.png";

const EditBlog = () => {
  const { title } = useParams();
  const [blog, setBlog] = useState({});
  const { loading, setLoading } = useContext(LoadingContext);

  const navigate = useNavigate();
  const [coverImg, setCoverImg] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [tagInputs, setTagInputs] = useState([]);
  const [editorHtml, setEditorHtml] = useState("");
  const { quill, quillRef } = useQuill();
  const [errors, setErrors] = useState({
    coverImg: "",
    title: "",
    tags: "",
    content: "",
  });

  const fullDate = localDateAndTime();
  const time = getLocalTime();

  useEffect(() => {
    if (title) {
      handleDynamicBlog(title?.replace(/_/g, " "));
    }
  }, [title]);

  const handleDynamicBlog = async (title) => {
    try {
      setLoading(true);
      const response = await getDynamicBlog(title);
      if (response.status == 200) {
        setBlog(response?.data?.article);
      } else {
        toast.dismiss();
        toast.error(response?.data?.message || "Something went worng!");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.dismiss();
      toast.error(error?.message || "Something went worng!");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (blog) {
      setCoverImg(blog.coverImg);
      setTagInputs(blog.tag);
      setBlogTitle(blog.blogTitle);

      // Set Quill editor initial content
      if (blog.blogContent) {
        quill.clipboard.dangerouslyPasteHTML(blog.blogContent);
        setEditorHtml(blog.blogContent); // Keep local state in sync
      }
    }
  }, [blog]);

  // generate image url for cover picture by hosting free image hosting server

  const uploadCoverImg = async (event) => {
    try {
      const url = await generateImageUrl(event.target.files[0]);
      setCoverImg(url);
    } catch (error) {
      console.log(error);
    }
  };

  // multiple tags input
  const addTagFields = () => {
    setTagInputs([...tagInputs, { tags: "" }]);
  };

  const handleTagChange = (i, e) => {
    let newTags = [...tagInputs];
    newTags[i][e.target.name] = e.target.value;
    setTagInputs(newTags);
  };

  const handletagRemove = (index) => {
    const newTags = [...tagInputs];
    newTags.splice(index, 1);
    setTagInputs(newTags);
  };

  const handleTitleChange = (e) => {
    setBlogTitle(e.target.value);
  };

  // 0pen dialog to select and upload image
  const handleImageUpload = async () => {
    try {
      const file = await selectLocalImage();
      const imageUrl = await generateImageUrl(file);
      insertToEditor(imageUrl);
    } catch (err) {
      console.error("err", err?.message);
    }
  };

  // Insert Image(selected by user) to quill
  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, "image", url);
  };

  useEffect(() => {
    if (quill) {
      // Add custom handler for Image Upload
      quill.getModule("toolbar").addHandler("image", handleImageUpload);
      // Listen to text change events
      quill.on("text-change", () => {
        setEditorHtml(quill.root.innerHTML); // Get HTML content
      });
    }
  }, [quill]);

  // checking validations while publishing and drafting
  const validateForm = () => {
    let newErrors = { coverImg: "", title: "", tags: "", content: "" };
    let isValid = true;

    if (!coverImg) {
      newErrors.coverImg = "Cover image is required.";
      isValid = false;
    }

    if (!blogTitle.trim()) {
      newErrors.title = "Title is required.";
      isValid = false;
    }

    const hasValidTags = tagInputs.some((tag) => tag.tags.trim() !== "");
    if (!hasValidTags) {
      newErrors.tags = "At least one tag is required.";
      isValid = false;
    }

    if (!editorHtml || editorHtml === "<p><br></p>") {
      newErrors.content = "Blog content cannot be empty.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // submit full blog data to the mongodb database
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const fullBloglogData = {
      date: fullDate,
      coverImg: coverImg,
      tag: tagInputs,
      blogTitle: blogTitle,
      blogContent: editorHtml,
    };

    try {
      setLoading(true);
      const response = await updateBlog(blog._id, fullBloglogData);
      if (response.status == 200) {
        toast.success(response.data.message);
        navigate("/admin/blogs");
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

  const handleback = () => {
    navigate(-1);
  };
  return (
    <section>
      <section>
        <div
          className="d-flex gap-2 align-items-center mb-3 cursor-pointer"
          onClick={handleback}
        >
          <img src={arrow} alt="back" height={15} width={15} />

          <p className="light-gray text-base m-0 p-0">Go to back</p>
        </div>
      </section>

      <section className="d-flex justify-content-center">
        <div className="w-100">
          <form>
            <section className="write-blog-header ">
              <div className="row px-2 pb-4 pb-lg-0">
                <div className="col-lg-5 p-4">
                  {coverImg ? (
                    <div className="cover-img-bg gray-background rounded-2">
                      <img
                        className="selected-cover-img w-100 h-100 rounded-2"
                        src={coverImg}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="coverPicInput"
                        className="cover-img-bg gray-background rounded-2 d-flex align-items-center justify-content-center position-relative"
                      >
                        <div>
                          <p className="text-poppins light-black-text text-lg text-center fw-bold ">
                            Click to Add Article Cover
                          </p>
                        </div>
                        <div className="position-absolute end-0 bottom-0 p-3">
                          <img src={selectImg} alt="select-image" />
                        </div>
                      </label>
                      <input
                        onChange={uploadCoverImg}
                        id="coverPicInput"
                        type="file"
                        style={{ display: "none" }}
                      />
                    </div>
                  )}
                  {errors.coverImg && (
                    <p className="text-danger font-nunito text-sm-xs m-0 mt-1">
                      {errors.coverImg}
                    </p>
                  )}
                </div>
                <div className="col-lg-7 px-4 py-0 py-lg-4">
                  <div className=" h-100 d-flex flex-column">
                    <div>
                      <div className="w-100">
                        <p className="text-base text-light-black-text font-nunito mb-2">
                          {" "}
                          Post On:
                        </p>
                        <div className="d-flex">
                          <div className="post-on ">
                            <p className="post-date">{fullDate}</p>
                            <img src={dateIcon} alt="" />
                          </div>
                          <div id="time-div" className="post-on">
                            <p className="post-date">{time}</p>
                            <img src={timeIcon} alt="" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <p
                          style={{ marginBottom: "-12px" }}
                          className="text-base text-light-black-text font-nunito mt-3"
                        >
                          Tags:
                        </p>

                        <div>
                          <div className="d-flex flex-wrap gap-2">
                            <div>
                              <button
                                type="button"
                                onClick={addTagFields}
                                className="add-tag-btn border-0 mt-3 p-2 rounded-1 text-xs text-white font-poppins"
                              >
                                Add Tags{" "}
                                <img
                                  className="tag-plus-icon"
                                  src={plus}
                                  alt=""
                                />
                              </button>
                            </div>
                            <div className="tags-input position-relative d-flex flex-wrap">
                              {tagInputs?.map((data, index) => (
                                <div key={index} className="d-flex mt-3">
                                  <input
                                    type="text"
                                    name="tags"
                                    value={data.tags}
                                    onChange={(e) => handleTagChange(index, e)}
                                  />
                                  <p
                                    className="text-secondary tag-close bg-transparent"
                                    onClick={() => handletagRemove(index)}
                                  >
                                    +
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                          {errors.tags && (
                            <p className="text-danger font-nunito text-sm-xs m-0 mt-1">
                              {errors.tags}
                            </p>
                          )}
                        </div>

                        <div className="article-title-input">
                          <input
                            type="text"
                            placeholder="Article Title Here"
                            name="title"
                            value={blogTitle}
                            onChange={(e) => handleTitleChange(e)}
                          />
                          {errors.title && (
                            <p className="text-danger font-nunito text-sm-xs m-0 mt-1">
                              {errors.title}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto d-md-flex gap-3">
                      <button
                        disabled={loading}
                        type="button"
                        onClick={handleSubmit}
                        className={`publish-article-btn mt-3 ${
                          loading ? "opacity-50" : ""
                        }`}
                      >
                        Update Article
                      </button>
                      <button
                        onClick={handleback}
                        disabled={loading}
                        type="button"
                        className={`save-as-draft-btn mt-3 ${
                          loading ? "opacity-50" : ""
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Write blog contents */}
            <section className="py-5">
              <div
                style={{
                  width: "100%",
                  height: "300px",
                }}
              >
                <div ref={quillRef} />
              </div>
              {errors.content && (
                <p className="text-danger font-nunito text-sm-xs m-0 mt-5">
                  {errors.content}
                </p>
              )}
            </section>
          </form>
        </div>
      </section>
      {/* <section>
        <div
          className="blog-content"
          style={{
            padding: "1rem",
            border: "1px solid #ccc",
            minHeight: 100,
            width: "100%",
          }}
          dangerouslySetInnerHTML={{ __html: editorHtml }}
        />
      </section> */}
    </section>
  );
};

export default EditBlog;
