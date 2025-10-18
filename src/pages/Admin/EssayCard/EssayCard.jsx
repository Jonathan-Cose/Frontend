import React, { useState, useRef } from 'react';
import './EssayCard.css';
import useResources from '../../../hooks/handleResourcesHook';
import { toast } from 'react-hot-toast';
import { uploadImage, validateImage } from '../../../utils/imagekit';
import Editor from '../../../components/TextEditorNopic/TextEditor.jsx'

const EssayCard = ({ onSave }) => {
  const [heading, setHeading] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef();
  const { createResource } = useResources();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (saving) return;
    if (!heading || !file || !text) {
      toast.error('Please fill all fields and upload an image.');
      return;
    }

    // Validate image file before upload
    const validation = validateImage(file);

    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setSaving(true);
    try {
      toast.loading('Uploading image...');
      const uploadResult = await uploadImage(file, "essays");
      await createResource(
        {
          heading: uploadResult.name,
          category:"nocat",
          text: uploadResult.fileId,
          pic: uploadResult.url,
          type: "picturehandle"
        }
      )
      toast.dismiss();

      if (!uploadResult.success) {
        toast.error('Image upload failed: ' + uploadResult.error);
        return;
      }

      // Send essay data + image URL to backend
      await createResource({
        heading,
        category: "nocat",
        text,
        pic: uploadResult.url,
        type: "essay"
      });

      // toast.success('Essay created successfully');
      setHeading('');
      setText('');
      setFile(null);
      setFileName('');
      if (onSave) onSave();

    } catch (err) {
      toast.dismiss();
      toast.error('Failed to upload image or save essay');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="essay-card">
      <input
        className="essay-card-input"
        type="text"
        placeholder="Heading"
        value={heading}
        onChange={e => setHeading(e.target.value)}
      />
      {/* <textarea
        className="essay-card-textarea"
        placeholder="Type here..."
        value={text}
        onChange={e => setText(e.target.value)}
        rows={5}
      /> */}
      <Editor value={text} onChange={(value) => setText(value)} folder={'essays'}/>
      <div className="essay-card-actions">
        <button className="essay-card-upload" onClick={handleUploadClick}>
          <span className="essay-card-upload-icon">&#8682;</span>
          {fileName || 'Upload a pic'}
        </button>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button className="essay-card-save" onClick={handleSave} disabled={saving}>
          {saving ? 'SAVING...' : 'SAVE'}
        </button>
      </div>
      <a href="/essays">
        <button className='goto'>Go to essays</button>
      </a>
    </div>
  );
};

export default EssayCard;
