import React, { useContext, useState, useRef, useEffect } from "react";
import "./WriteBlogPost.css";
import { Link } from "react-router-dom";
import arrow from "../../../assets/icon/left-arrow.png";
import selectImg from "../../../assets/icon/select-img.png";
import dateIcon from "../../../assets/icon/date.png";
import timeIcon from "../../../assets/icon/time.png";
import plus from "../../../assets/icon/plus.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../../context/LoadingContext";
import { postedLocalTime } from "../../../utils/localtime";
import { postBlog, setDraft } from "../../../services/userServices";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const WriteBlogPost = () => {
  const { setLoading } = useContext(LoadingContext);
  const quillRefs = useRef([]);
  const hostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  console.log("hostingKey", hostingKey);

  // generate image url for cover picture by hosting free image hosting server
  const [coverImg, setCoverImg] = useState(null);
  const handleImageUpload = async (event) => {
    // console.log(event);
    const imageData = new FormData();
    imageData.set("key", hostingKey);
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        // console.log(response);
        setCoverImg(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });

    // const url = await hostImage(event);
    // setCoverImg(url);
  };

  // get local time
  const d = new Date();
  let time = d.toLocaleTimeString();

  // dynamic tags input
  const [blogTitle, setBlogTitle] = useState({ title: "" });
  const [tagInputs, setTagInputs] = useState([]);

  const addTagFields = () => {
    setTagInputs([...tagInputs, { tags: "" }]);
  };

  const handleTagChange = (i, e) => {
    let newTags = [...tagInputs];
    newTags[i][e.target.name] = e.target.value;
    setTagInputs(newTags);
  };

  const handleTitleChange = (e) => {
    setBlogTitle({ ...blogTitle, [e.target.name]: e.target.value });
  };

  // dymic blog conent inputs
  const [blogInputs, setBlogInputs] = useState([
    { img: "", heading: "", description: "", color: "" },
  ]);
  const addBlogFields = () => {
    setBlogInputs([
      ...blogInputs,
      { img: "", heading: "", description: "", color: "" },
    ]);
  };

  //  Increase blog input fiels by hitting enter on textarea
  const handleKeyPress = () => {
    addBlogFields();
  };

  const handleBlogInputChange = (index, Name, e) => {
    console.log("index", index, "name", Name, "value", e);
    console.log(blogInputs);

    if (Name === "description") {
      let newInputs = [...blogInputs];
      newInputs[index][Name] = e;
      setBlogInputs(newInputs);
    } else {
      let newInputs = [...blogInputs];
      newInputs[index][e.target.name] = e.target.value;
      setBlogInputs(newInputs);

      // image file upload for blog writer
      if (e.target.files) {
        const imageData = new FormData();
        imageData.set("key", hostingKey);
        imageData.append("image", e.target.files[0]);

        axios
          .post("https://api.imgbb.com/1/upload", imageData)
          .then(function (response) {
            if (e.target.name === "img") {
              let newInputs = [...blogInputs];
              // console.log(index);
              newInputs[index].img = response.data.data.display_url;
              setBlogInputs(newInputs);
            }
            let newInputs = [...blogInputs];
            newInputs[index].img = response.data.data.display_url;
            setBlogInputs(newInputs);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  // submit full blog data to the mongodb server
  const navigate = useNavigate();
  const fullDate = postedLocalTime();

  const handleSubmit = async (event) => {
    const fullBloglogData = {
      date: fullDate,
      coverImg: coverImg,
      tag: tagInputs,
      blogTitle: blogTitle.title,
      blogContent: blogInputs,
    };
    try {
      setLoading(true);
      const response = await postBlog(fullBloglogData);
      if (response.error) {
        toast.dismiss();
        toast.error(response?.error?.message || "Something went worng!");
      } else {
        toast.success("Blog posted successfully!");
        navigate("/dashboard/blogs");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
    event.preventDefault();
  };

  // Save as draft
  const handleDraftSubmit = async (event) => {
    const fullDate = postedLocalTime();

    const fullBloglogData = {
      date: fullDate,
      coverImg: coverImg,
      tag: tagInputs,
      blogTitle: blogTitle.title,
      blogContent: blogInputs,
    };

    try {
      setLoading(true);
      const response = await setDraft(fullBloglogData);
      if (response.error) {
        toast.dismiss();
        toast.error(response?.error?.message || "Something went worng!");
      } else {
        toast.success("Draft saved successfully!");
        navigate("/dashboard/blogs");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
    event.preventDefault();
  };

  // restrict the copied color of text
  useEffect(() => {
    blogInputs?.forEach((_, index) => {
      const quillInstance = quillRefs.current[index];
      if (quillInstance && quillInstance.getEditor) {
        const editor = quillInstance.getEditor();

        // Prevent adding matcher multiple times
        if (!editor._customPasteMatcherSet) {
          editor.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
            delta.ops = delta.ops.map((op) => {
              if (op.attributes) {
                // Remove color attribute if it exists
                if (op.attributes.color) {
                  delete op.attributes.color;
                }
              }
              return op;
            });
            return delta;
          });

          editor._customPasteMatcherSet = true;
        }
      }
    });
  }, [blogInputs?.length]);
  return (
    <section>
      <section className="back-to-home-bg d-flex justify-content-center neutral-black-bg">
        <div
          style={{ maxWidth: "1320px" }}
          className="w-100 d-flex align-items-center mt-5"
        >
          <div className="d-flex align-items-center">
            <Link to="/dashboard/blogs">
              <img className="left-arrow" src={arrow} alt="" />
            </Link>
            <p className="back-to-home">Back to home</p>
          </div>
        </div>
      </section>

      <section className="d-flex justify-content-center neutral-black-bg">
        <div
          style={{ maxWidth: "1440px", padding: "0px 64px" }}
          className=" w-100"
        >
          <form>
            <section className="write-blog-header secondary-black-fade-bg py-5">
              <div className="">
                <div className="row">
                  <div className="col-md-5">
                    {coverImg ? (
                      <div className="cover-img-bg">
                        <img
                          className="selected-cover-img"
                          src={coverImg}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div>
                        <label
                          htmlFor="coverPicInput"
                          className="cover-img-bg d-flex align-items-center justify-content-center"
                        >
                          <div>
                            <p className="text-center click-to-add-cover">
                              Click to Add Article Cover
                            </p>
                          </div>
                          <div className="d-flex align-items-end justify-content-end cover-select-image">
                            <img src={selectImg} alt="" />
                          </div>
                        </label>
                        <input
                          onChange={handleImageUpload}
                          id="coverPicInput"
                          type="file"
                          style={{ display: "none" }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-7">
                    <div className="blog-header-post-left-space h-100 d-flex align-items-start flex-column">
                      <div>
                        <div>
                          <div>
                            <p className="post-on-text"> Post On:</p>
                            <div className="d-flex">
                              <div className="post-on">
                                <p className="post-date">{fullDate}</p>
                                <img src={dateIcon} alt="" />
                              </div>
                              <div id="time-div" className="post-on">
                                <p className="post-date">{time}</p>
                                <img src={timeIcon} alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p
                            style={{ marginBottom: "7px" }}
                            className="post-on-text mt-3"
                          >
                            Tags:
                          </p>

                          <div className="d-flex">
                            <div>
                              <button
                                type="button"
                                onClick={addTagFields}
                                className="add-tag-btn"
                              >
                                Add Tags{" "}
                                <img
                                  className="tag-plus-icon"
                                  src={plus}
                                  alt=""
                                />
                              </button>
                            </div>
                            <div className="tags-input">
                              {tagInputs.map((data, index) => (
                                <input
                                  key={index}
                                  type="text"
                                  name="tags"
                                  value={data.tags}
                                  onChange={(e) => handleTagChange(index, e)}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="article-title-input">
                            <input
                              type="text"
                              placeholder="Article Title Here"
                              name="title"
                              value={blogTitle.title}
                              onChange={(e) => handleTitleChange(e)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="publish-article-btn"
                        >
                          Publish Article
                        </button>
                        <button
                          type="button"
                          onClick={handleDraftSubmit}
                          className="save-as-draft-btn"
                        >
                          Save as Draft
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Write blog contents */}
            <section className="write-blog-section">
              <div className="py-5">
                {blogInputs.map((items, index) => (
                  <div className="mt-5" key={index}>
                    <img src={items.img} className="img-fluid" alt="" />
                    <div className="">
                      <input
                        onChange={(e) =>
                          handleBlogInputChange(index, "image", e)
                        }
                        id="fileInput"
                        type="file"
                        name="img"
                        className="file-upload-btn"
                      />

                      <div className="d-flex">
                        <div>
                          <input
                            className="writeInput title-input"
                            style={{ color: items.color }}
                            placeholder="Heading"
                            type="text"
                            name="heading"
                            value={items.heading}
                            onChange={(e) =>
                              handleBlogInputChange(index, "heading", e)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex w-100 position-relative">
                      {/* <textarea
                        className="writeInput writeText"
                        placeholder="Type the description..."
                        type="text"
                        name="description"
                        value={items.description}
                        onChange={(e) => handleBlogInputChange(index, e)}
                        onKeyPress={handleKeyPress}
                      /> */}

                      <ReactQuill
                        ref={(el) => (quillRefs.current[index] = el)}
                        className="quill-white-text"
                        style={{ width: "100%", margin: "5px", color: "white" }}
                        theme="snow"
                        name="description"
                        value={items.description}
                        onChange={(e) =>
                          handleBlogInputChange(index, "description", e)
                        }
                        modules={{
                          toolbar: [
                            ["bold", "italic", "underline", "strike"],
                            ["link", "blockquote", "code-block"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            [{ header: [1, 2, 3, false] }],
                            ["clean"],
                          ],
                        }}
                        placeholder="Type the description..."
                      />

                      <button
                        type="button"
                        className="close text-white bg-transparent border-0 fs-3 position-absolute end-0 bottom-100"
                        aria-label="Close"
                        onClick={handleKeyPress}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </form>
        </div>
      </section>
    </section>
  );
};

export default WriteBlogPost;
