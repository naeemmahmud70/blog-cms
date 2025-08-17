/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { selectLocalImage } from "../../utils/selectLocalImage";
import { generateImageUrl } from "../../services/imageUpload";

export default function QuillEditor({ setEditorHtml, errors }) {
  const { quill, quillRef } = useQuill();

  // 0pen dialog to select and upload image
  const handleImageUpload = async () => {
    try {
      const file = await selectLocalImage();
      const imageUrl = await generateImageUrl(file);
      insertToEditor(imageUrl);
    } catch (error) {
      toast.dismiss();
      toast.error(error?.message || "Something went worng!");
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

  return (
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
  );
}
