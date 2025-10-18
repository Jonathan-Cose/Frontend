import React, { useState, useRef } from 'react';
import '../PoemCard/PoemCard.css';
import useResources from '../../../hooks/handleResourcesHook';
import { toast } from 'react-hot-toast';
import { uploadImage, validateImage } from '../../../utils/imagekit';
import Editor from '../../../components/TextEditorNopic/TextEditor.jsx'

const LiteraryDiaryCard = ({ onSave }) => {
  const [heading, setHeading] = useState('');
  const [selected, setSelected] = useState('');
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef();
  const { createResource } = useResources();

  const handleCheckbox = (value) => {
    setSelected(selected === value ? '' : value);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (saving) return;
    if (!heading || !text || !selected || !file) {
      toast.error('Please select a category and upload an image.');
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
      const uploadResult = await uploadImage(file, "literarydiary");
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

      // Send picture data + image URL to backend
      await createResource({
        heading: heading,
        category: selected,
        text: text ,
        pic: uploadResult.url,
        type: "literaryDiary"
      });

      setHeading('');
      setText('');
      setFile(null);
      setFileName('');
      setSelected('');
      if (onSave) onSave();
    } catch (err) {
      toast.dismiss();
      toast.error('Failed to upload image or save literary diary entry');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="poem-card">
      <input
        className="poem-card-input"
        type="text"
        placeholder="Heading"
        value={heading}
        onChange={e => setHeading(e.target.value)}
      />
      <div style={{display: 'flex', gap: '2rem', alignItems: 'center', margin: '0.5rem 0 0.5rem 0'}}>
        <label style={{display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '1.3rem', cursor: 'pointer'}}>
          <input
            type="checkbox"
            checked={selected === 'reflexes'}
            onChange={() => handleCheckbox('reflexes')}
            style={{width: '2rem', height: '2rem', marginRight: '0.5rem', accentColor: '#222', borderRadius: '0.5rem'}}
          />
          Different Reflexes
        </label>
        <label style={{display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '1.3rem', cursor: 'pointer'}}>
          <input
            type="checkbox"
            checked={selected === 'vangel'}
            onChange={() => handleCheckbox('vangel')}
            style={{width: '2rem', height: '2rem', marginRight: '0.5rem', accentColor: '#222', borderRadius: '0.5rem'}}
          />
          Urban Vangel
        </label>
      </div>
      {/* <textarea
        className="poem-card-textarea"
        placeholder="Type here..."
        value={text}
        onChange={e => setText(e.target.value)}
        rows={5}
      /> */}
      <Editor value={text} onChange={(value) => setText(value)} folder={'literarydiary'}/>
      <div className="poem-card-actions" style={{justifyContent: 'space-between'}}>
        <button className="essay-card-upload" onClick={handleUploadClick}>
          <span className="essay-card-upload-icon">&#8682;</span>
          {fileName ? fileName : 'Upload a pic'}
        </button>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button className="poem-card-save" onClick={handleSave} disabled={saving}>
          {saving ? 'SAVING...' : 'SAVE'}
        </button>
      </div>
      <a href="/literary-diary">
        <button className='goto'>Go to literary diary</button>
      </a>
    </div>
  );
};

export default LiteraryDiaryCard; 