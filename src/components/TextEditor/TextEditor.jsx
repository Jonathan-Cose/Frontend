import React, { useState, useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import CodeBlock from '@tiptap/extension-code-block';
import Heading from '@tiptap/extension-heading';
import Placeholder from '@tiptap/extension-placeholder';
import DOMPurify from 'dompurify';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Image from '@tiptap/extension-image';
import { uploadImage, validateImage } from '../../utils/imagekit.js'
import useResources from '../../hooks/handleResourcesHook.js'
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHeading,
  FaListUl,
  FaCode,
  FaImage,
  FaTable,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaPlusCircle
} from "react-icons/fa";
import { TbColumnInsertLeft, TbColumnInsertRight, TbColumnRemove, TbRowInsertBottom, TbRowInsertTop, TbRowRemove } from "react-icons/tb";


import './TextEditor.css';

const Editor = ({ value, onChange, folder, onImageUpload, onLoadingChange }) => {
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { createResource } = useResources();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CodeBlock,
      Heading.configure({ levels: [1, 2] }),
      Placeholder.configure({
        placeholder: 'Type here...',
      }),
      Table.configure({
        resizable: true,
        handleWidth: 5,
        cellMinWidth: 100,
        lastColumnResizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell.configure({
        HTMLAttributes: {
          class: 'table-cell',
        },
      }),
      Image, // <-- Add TipTap's image extension
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const dirtyHTML = editor.getHTML();
      const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
        USE_PROFILES: { html: true },
        ALLOWED_TAGS: [
          'b', 'i', 'u', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li',
          'h1', 'h2', 'h3', 'code', 'pre', 'blockquote',
          'table', 'thead', 'tbody', 'tr', 'td', 'th',
          'img'
        ],
        ALLOWED_ATTR: ['class', 'style', 'src', 'alt', 'title'],
      });

      const isEmpty = editor.getText().trim() === '';
      setShowEmptyWarning(isEmpty);

      if (onChange) {
        onChange(cleanHTML);
      }
    },
  });

  // Add effect to clear editor when value is set to ""
  useEffect(() => {
    if (editor && value === '') {
      editor.commands.clearContent();
    }
  }, [value, editor]);
  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(loading);
    }
  }, [loading, onLoadingChange]);

  // Utility function to insert a new paragraph at the end
  const insertParagraphAtEnd = () => {
    if (!editor) return;
    // Move selection to the end of the document
    const endPos = editor.state.doc.content.size - 1;
    editor.chain().focus().setTextSelection(endPos).insertContent('<p><br></p>').run();
  };

  if (!editor) return null;

  const isTableActive = editor.isActive('table');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setLoading(true);

    const { valid, error } = validateImage(file);
    if (!valid) {
      alert(error);
      return;
    }
  
    const res = await uploadImage(file,folder);

    await createResource(
      {
        heading: res.name,
        category:"nocat",
        text: res.fileId,
        pic: res.url,
        type: "picturehandle"
      }
    )
    // toast.dismiss();

    if (!res.success) {
      toast.error('Upload failed: ' + res.error);
      return;
    }

    if (res.success) {
      // Notify parent of uploaded image URL
      if (onImageUpload) {
        onImageUpload(res.url);
      }
      editor
      .chain()
      .focus()
      .insertContent([
        {
          type: 'image',
          attrs: {
            src: res.url,
          },
        },
        {
          type: 'paragraph',
        },
      ])
      .run();
    
      editor.commands.focus('end');
    }
  
    setLoading(false);
    e.target.value = '';
  };

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active' : ''}><FaBold /></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active' : ''}><FaItalic /></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'active' : ''}><FaUnderline/></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}><FaHeading/></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}><b>H2</b></button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'active' : ''}><FaListUl/></button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'active' : ''}><FaCode/></button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        <button onClick={() => fileInputRef.current.click()}><FaImage /> </button>
        <button onClick={insertParagraphAtEnd} title="Insert paragraph at end"><FaPlusCircle/><b>PARA</b></button>

        <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><FaTable /></button>
        
        {isTableActive && (
          <>
            <div className="table-controls-separator">|</div>
            <button onClick={() => editor.chain().focus().addColumnBefore().run()} disabled={!editor.can().addColumnBefore()}><TbColumnInsertLeft/></button>
            <button onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.can().addColumnAfter()}><TbColumnInsertRight/></button>
            <button onClick={() => editor.chain().focus().deleteColumn().run()} disabled={!editor.can().deleteColumn()}><TbColumnRemove /></button>
            <button onClick={() => editor.chain().focus().addRowBefore().run()} disabled={!editor.can().addRowBefore()}><TbRowInsertTop/></button>
            <button onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!editor.can().addRowAfter()}><TbRowInsertBottom/></button>
            <button onClick={() => editor.chain().focus().deleteRow().run()} disabled={!editor.can().deleteRow()}><TbRowRemove/></button>
            <button onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.can().deleteTable()}><FaTable /><b>-</b></button>
          </>
        )}
      </div>

      <EditorContent editor={editor} className="tiptap-editor" />

      {showEmptyWarning && (
        <p style={{ color: 'red', marginTop: '5px' }}>
          Text cannot be empty!
        </p>
      )}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Uploading image...</p>
        </div>
      )}
    </div>
  );
};

export default Editor;
