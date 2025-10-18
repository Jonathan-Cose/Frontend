import React, { useState, useRef } from 'react';
import '../PoemCard/PoemCard.css';
import useResources from '../../../hooks/handleResourcesHook';
import { toast } from 'react-hot-toast';
import { uploadImage, validateImage } from '../../../utils/imagekit';

const NewCategoryCard = ({ onSave }) => {
  const [categoryFor, setCategoryFor] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef();
  const { createResource, getResources } = useResources();
  
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

    if (!categoryFor || !categoryName) {
      toast.error('Please fill all fields.');
      return;
    }

    if (categoryFor === 'poems') {
      if (!file) {
        toast.error('Please upload an image for poems category.');
        return;
      }
      // Validate image file before upload
      const validation = validateImage(file);
      if (!validation.valid) {
        toast.error(validation.error);
        return;
      }
      try {
        toast.loading('Uploading image...');
        const uploadResult = await uploadImage(file, 'poems');
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
        
        if (categoryFor=="poems"){
          await createResource({ heading: categoryFor, text: categoryName, category: "noCat", pic: uploadResult.url, type: "addnewcat" });
        }
        if (categoryFor=="pictures"){
          await createResource({ heading: categoryFor, text: categoryName, category: "noCat", pic: "nopic", type: "addnewcat" });
        }

        setCategoryFor('');
        setCategoryName('');
        setFile(null);
        setFileName('');

        await getResources('poem')
        await getResources('essay')
        if (onSave) onSave();
      } catch (err) {
        toast.dismiss();
        toast.error('Failed to upload image or save new category');
        console.error(err);
      }
    } else {
      try {
        await createResource({ heading: categoryFor, text: categoryName, category: "noCat", pic: "noPic", type: "addnewcat" });
        setCategoryFor('');
        setCategoryName('');
        setFile(null);
        setFileName('');
        if (onSave) onSave();

        await getResources('poem')
        await getResources('essay')
      } catch (err) {
        toast.error('Failed to create new category');
        console.error(err);
      }
    }
  };

  return (
    <div className="poem-card">
      <select
        className="poem-card-select"
        value={categoryFor}
        onChange={e => setCategoryFor(e.target.value)}
      >
        <option value="" disabled>Category For</option>
        <option value="pictures">Pictures</option>
        <option value="poems">Poems</option>
      </select>
      <input
        className="poem-card-input"
        type="text"
        placeholder="New Category Name"
        value={categoryName}
        onChange={e => setCategoryName(e.target.value)}
      />
      {categoryFor === 'poems' && (
        <div className="poem-card-upload-wrapper">
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
        </div>
      )}
      <div className="poem-card-actions">
        <button className="poem-card-save" onClick={handleSave}>SAVE</button>
      </div>
    </div>
  );
};

export default NewCategoryCard; 