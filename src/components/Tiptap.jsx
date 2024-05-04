import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback } from "react";

// define your extension array
const extensions = [
  StarterKit,
  Link.configure({
    autolink: false,
  }),
  Placeholder.configure({
    placeholder: "Write something …",
  }),
];

const content = "";

const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    // cancelled
    if (url === null) {
      return;
    }
    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const getContent = () => {
    const cont = editor.getHTML();
    console.log(cont);
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="toolbar">
        <button
          onClick={setLink}
          className={editor.isActive("href") ? "flt-btn is-active" : "flt-btn"}
        >
          Link
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "flt-btn is-active" : "flt-btn"}
        >
          bold
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "flt-btn is-active"
              : "flt-btn"
          }
        >
          h1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "flt-btn is-active"
              : "flt-btn"
          }
        >
          h2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "flt-btn is-active"
              : "flt-btn"
          }
        >
          h3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList") ? "flt-btn is-active" : "flt-btn"
          }
        >
          list
        </button>
      </div>
      <EditorContent editor={editor} readOnly />
      <button onClick={getContent}>Save</button>
    </>
  );
};

export default Tiptap;
