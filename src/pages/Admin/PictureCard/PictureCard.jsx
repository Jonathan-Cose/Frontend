import React, { useRef, useState, useEffect } from 'react';
import '../PoemCard/PoemCard.css';
import { uploadImage, validateImage } from '../../../utils/imagekit';
import useResources from '../../../hooks/handleResourcesHook';
import { toast } from 'react-hot-toast';

const PictureCard = ({ onUpload }) => {
  const fileInputRef = useRef();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const { createResource, getResources } = useResources();

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCats = await getResources('newcategory');
      if (fetchedCats && Array.isArray(fetchedCats)) {
        const pictureCats = fetchedCats
          .filter(cat => cat.categoryFor === 'pictures' && cat.newCategoryName)
          .map(cat => cat.newCategoryName);
        setCategories(pictureCats);
      }
    };
    fetchCategories();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
      if (onUpload) onUpload(selectedFile);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (saving) return;
    if (!category || !file) {
      toast.error('Please fill all fields and upload an image.');
      return;
    }

    const validation = validateImage(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setSaving(true);
    try {
      toast.loading('Uploading image...');
      const uploadResult = await uploadImage(file, "pictures");
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

      await createResource({
        heading: "nohead",
        category,
        text: "notext",
        pic: uploadResult.url,
        type: "picture"
      });

      setCategory('');
      setFile(null);
      setFileName('');
      // toast.success("Picture uploaded successfully!");
    } catch (err) {
      toast.dismiss();
      toast.error('Failed to upload image or save picture');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="poem-card">
      <select
        className="poem-card-select"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="" disabled>Select Category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <div
        style={{
          background: '#d3d3d3',
          borderRadius: '0.5rem',
          padding: '2.5rem 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1rem',
          marginBottom: '1rem'
        }}
      >
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
        <button className="essay-card-save" onClick={handleSave} disabled={saving}>
          {saving ? 'SAVING...' : 'SAVE'}
        </button>
      </div>

      <a href="/photographs">
        <button className='goto'>Go to pictures</button>
      </a>
    </div>
  );
};

export default PictureCard;
