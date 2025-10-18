import React, { useState, useEffect } from 'react';
import './PoemCard.css';
import useResources from '../../../hooks/handleResourcesHook';
import { toast } from 'react-hot-toast';
// import Editor from '../../../components/TextEditor/TextEditor.jsx';
import Editor from '../../../components/TextEditorNopic/TextEditor.jsx'

const PoemCard = () => {
  const [heading, setHeading] = useState('');
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const { createResource, getResources } = useResources();
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (saving) return;
    if (!heading || !category || !text) {
      toast.error('Please fill all fields.');
      return;
    }
    setSaving(true);
    try {
      await createResource({ heading, category, text, pic: "noPic", type: "poem" });
      setHeading('');
      setCategory('');
      setText('');
    } catch (err) {
      console.error('Failed to create poem', err);
      toast.error('Failed to create poem');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCats = await getResources('newcategory');
      // console.log("for poem card", fetchedCats);
  
      if (fetchedCats && Array.isArray(fetchedCats)) {
        const poemCats = fetchedCats.filter(cate => cate.categoryFor === 'poems');
  
        const uniqueCats = poemCats
          .filter(cat => cat.newCategoryName)
          .map(cat => ({
            id: cat._id,
            label: cat.newCategoryName,
          }));
  
        setCategories(uniqueCats);
      }
    };
  
    fetchCategories();
  }, []);
  

  return (
    <div className="poem-card">
      <input
        className="poem-card-input"
        type="text"
        placeholder="Heading"
        value={heading}
        onChange={e => setHeading(e.target.value)}
      />
      <select
        className="poem-card-select"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="" disabled>Select Category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.label}>
            {cat.label}
          </option>
        ))}
      </select>
      {/* <textarea
        className="poem-card-textarea"
        placeholder="Type here..."
        value={text}
        onChange={e => setText(e.target.value)}
        rows={5}
      /> */}
      <Editor value={text} onChange={(value) => setText(value)} folder={'poems'}/>
      <div className="poem-card-actions">
        <button className="poem-card-save" onClick={handleSave} disabled={saving}>
          {saving ? 'SAVING...' : 'SAVE'}
        </button>
      </div>
      <a href="/poems">
        <button className='goto'>Go to poems</button>
      </a>
    </div>
  );
};

export default PoemCard;
