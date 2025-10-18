import React, { useState } from 'react';
import '../PoemCard/PoemCard.css';
import useResources from '../../../hooks/handleResourcesHook';
import { toast } from 'react-hot-toast';
import Editor from '../../../components/TextEditorNopic/TextEditor.jsx'

const RaccontiCard = ({ onSave }) => {
  const [heading, setHeading] = useState('');
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);

  const { createResource } = useResources();

  const handleSave = async (e) => {
    e.preventDefault();

    if (!heading || !text) {
      toast.error('Please fill all fields.');
      return;
    }

    setSaving(true);

    try {
      await createResource({
        heading,
        category: 'noCat',
        text,
        pic: 'noPic',
        type: 'racconti'
      });

      setHeading('');
      setText('');
      if (onSave) onSave();
    } catch (err) {
      toast.error('Failed to save Racconti.');
      console.error('Error saving racconti:', err);
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
        onChange={(e) => setHeading(e.target.value)}
      />

      <Editor value={text} onChange={(value) => setText(value)} folder={'racconti'}/>

      <div className="poem-card-actions">
        <button
          className="poem-card-save"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'SAVING...' : 'SAVE'}
        </button>
      </div>
      <a href="/racconti">
        <button className='goto'>Go to racconti</button>
      </a>
    </div>
  );
};

export default RaccontiCard;
