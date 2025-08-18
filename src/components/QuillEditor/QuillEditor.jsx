/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { selectLocalImage } from "../../utils/selectLocalImage";
import { generateImageUrl } from "../../services/imageUpload";

export default function QuillEditor({ editorHtml, setEditorHtml, errors }) {
  const quillRef = useRef(null);

  // 🔹 Simple debounce util
  const debounce = (fn, delay = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  // 🔹 Debounced parent update
  const syncEditorHtml = useCallback(
    debounce((html) => {
      setEditorHtml(html);
    }, 400),
    [setEditorHtml]
  );

  // Custom image upload handler
  const handleImageUpload = async () => {
    try {
      const file = await selectLocalImage();
      if (!file) return;
      const imageUrl = await generateImageUrl(file);
      insertToEditor(imageUrl);
    } catch (err) {
      toast.error(err?.message || "Image upload failed!");
    }
  };

  const insertToEditor = (url) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const range = editor.getSelection();
    if (range) {
      editor.insertEmbed(range.index, "image", url);
      editor.setSelection(range.index + 1);
    } else {
      editor.insertEmbed(editor.getLength() - 1, "image", url);
    }
  };

  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    // Override default image handler
    editor.getModule("toolbar").addHandler("image", handleImageUpload);

    // Debounced text-change sync
    const handler = () => syncEditorHtml(editor.root.innerHTML);
    editor.on("text-change", handler);

    return () => {
      editor.off("text-change", handler);
    };
  }, [syncEditorHtml]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <section className="py-5">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={editorHtml} // ✅ use parent state directly
        onChange={setEditorHtml} // immediate update (debounced inside text-change if needed)
        modules={modules}
        style={{ height: "300px" }}
      />
      {errors?.content && (
        <p className="text-danger font-nunito text-sm-xs m-0 mt-5">
          {errors.content}
        </p>
      )}
    </section>
  );
}
