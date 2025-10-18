import React, { useState, useEffect, useRef} from 'react';
import '../PoemCard/PoemCard.css';
import useResources from '../../../hooks/handleResourcesHook';
import Editor from '../../../components/TextEditor/TextEditor.jsx';
import "./DiabetesCard.css"
import toast from 'react-hot-toast';
import { uploadImage, validateImage } from '../../../utils/imagekit';

const DiabetesCard = ({ onSave }) => {
  const [heading, setHeading] = useState('');
  const [text, setText] = useState('');
  const { createResource, getResources, updateResource } = useResources();
  const [visibility,setVisibility] = useState(null);
  const [saving, setSaving] = useState(false);
  // const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  // New: state for uploaded image URL
  const [imageUrl, setImageUrl] = useState('noPic');
  // const fileInputRef = useRef();
  const [editorLoading, setEditorLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (saving) return;
    // console.log(heading, text)

    if (!heading || !text) {
      toast.error('Please fill all fields.');
      return;
    }
    
    // const validation = validateImage(file);
    // if (!validation.valid) {
    //   toast.error(validation.error);
    //   return;
    // }
    setSaving(true);
    try {
      // console.log('This is the image URL: ',imageUrl)
      await createResource({ heading, category: "noCat", text, pic: imageUrl, type: "diabetes" });
      setHeading('');
      setText('');
      setImageUrl('noPic');
    } catch (err) {
      console.error('Failed to create diabetes');
      toast.error('Fill all Categories')
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const fetchVisibility = async () => {
      try {
        const data = await getResources('diabetesvisibiity');
        if (data?.length > 0) {
          setVisibility(data[0]);
        }
      } catch (err) {
        console.error('Error fetching visibility:', err);
      }
    };
    fetchVisibility();
  }, []);

  const handleCheckboxChange = async (e) => {
    const updatedVisibility = e.target.checked;
  
    const updated = {
      ...visibility,
      visibility: updatedVisibility,
    };
  
    setVisibility(updated);
  
    try {
      await updateResource(updated);
    } catch (err) {
      console.error("Failed to update visibility in DB");
    }
  };

  return (
    <div className="poem-card">
      <div className='d-flex visibility'>
        <p>Diabetes page visibility</p>
        <label className="switch">
          <input
            type="checkbox"
            checked={visibility?.visibility || false}
            onChange={handleCheckboxChange}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <input
        className="poem-card-input"
        type="text"
        placeholder="Heading"
        value={heading}
        onChange={e => setHeading(e.target.value)}
      />
      {/* <textarea
        className="poem-card-textarea"
        placeholder="Type here..."
        value={text}
        onChange={e => setText(e.target.value)}
        rows={5}
      /> */}
      <div className='typeText'>
        <Editor value={text} onChange={(value) => setText(value)} folder={'diabetes'} onImageUpload={setImageUrl} onLoadingChange={setEditorLoading}/>
      </div>
      <div className="poem-card-actions">
        <button className="poem-card-save" onClick={handleSave} disabled={saving || editorLoading}>
          {saving ? 'SAVING...' : 'SAVE'}
        </button>
      </div>
      <a href="/diabetes">
        <button className='goto'>Go to diabetes</button>
      </a>
    </div>
  );
};

export default DiabetesCard; 