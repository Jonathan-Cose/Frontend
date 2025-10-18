import './Admin.css';
import "../../App.css"
import NavBarAdmin from '../../components/NavBarAdmin/NavBarAdmin';
import PoemCard from './PoemCard/PoemCard.jsx';
import EssayCard from './EssayCard/EssayCard.jsx';
import RaccontiCard from './RaccontiCard/RaccontiCard.jsx';
import DiabetesCard from './DiabetesCard/DiabetesCard.jsx';
import PictureCard from './PictureCard/PictureCard.jsx';
import LiteraryDiaryCard from './LiteraryDiaryCard/LiteraryDiaryCard.jsx';
import NewCategoryCard from './NewCategoryCard/NewCategoryCard.jsx';
import { useState } from 'react';
import useResources from '../../hooks/handleResourcesHook';
import { deleteImage } from '../../utils/imagekit.js';

const sections = [
  { id: 'poem', label: 'Add a Poem' }, 
  { id: 'essay', label: 'Add an Essay' },
  { id: 'racconti', label: 'Add a Racconti' },
  { id: 'picture', label: 'Add a Picture' },
  { id: 'diabetes', label: 'Add a Diabetes' },
  { id: 'literarydiary', label: 'Add a Literary Diary' },
  { id: 'newcategory', label: 'Add a New Category' },
];

const sections2 = [
  { id: 'poem', label: 'Delete a Poem' },
  { id: 'essay', label: 'Delete an Essay' },
  { id: 'racconti', label: 'Delete a Racconti' },
  { id: 'picture', label: 'Delete a Picture' },
  { id: 'diabetes', label: 'Delete a Diabetes' },
  { id: 'literarydiary', label: 'Delete a Literary Diary' },
  { id: 'newcategory', label: 'Delete a New Category' },
];

const Admin = () => {

  const [selection,setSelection] = useState('add');
  const [heading,setHeading] = useState("");
  const [itemsToDelete, setItemsToDelete] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ open: false, resourceType: '', id: '' });
  const { getResources, deleteResource } = useResources();
  const [deleting, setDeleting] = useState(false);
  const [ids,setIds] = useState('')

  const handleScroll = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const handleClick = async(id) => {
    setIds(id)
    // console.log("ids",id)
    if(id === 'poem'){
      setHeading('poem');
      try{
        const res = await getResources('poem');
        const sorted = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setItemsToDelete(sorted);
      }catch(error){
        console.log(error);
      }
    }
    if(id === 'essay'){
      setHeading('essay');
      try{
        const res = await getResources('essay');
        const sorted = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setItemsToDelete(sorted);
      }catch(error){
        console.log(error);
      }
    }
    if(id === 'racconti'){
      setHeading('racconti');
      try{
        const res = await getResources('racconti');
        const sorted = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setItemsToDelete(sorted);
      }catch(error){
        console.log(error);
      }
    }
    if(id === 'picture'){
      setHeading('picture');
      try{
        const res = await getResources('picture');
        const sorted = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setItemsToDelete(sorted);
      }catch(error){
        console.log(error);
      }
    }
    if(id === 'diabetes'){
      setHeading('diabetes');
      try{
        const res = await getResources('diabetes');
        const sorted = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setItemsToDelete(sorted);
        // console.log('from api call:',itemsToDelete)
      }catch(error){
        console.log(error);
      }
    }
    if(id === 'literarydiary'){
      setHeading('literarydiary');
      try{
        const res = await getResources('literarydiary');
        const sorted = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setItemsToDelete(sorted);
      }catch(error){
        console.log(error);
      }
    }
    if(id === 'newcategory'){
      setHeading('newcategory');
      try{
        const res = await getResources('newcategory');
        const sorted = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setItemsToDelete(sorted);
      }catch(error){
        console.log(error);
      }
    }
  };
  // console.log("delete model: ", deleteModal)
  const handleDeleteClick = (resourceType, id, pic) => {
    setDeleteModal({ open: true, resourceType, id, pic });
  };
  const confirmDelete = async() => {
    setDeleting(true);
    try {
      
      // console.log("delete model: ", deleteModal)


      const typesWithImages = ['picture', 'essay', 'literarydiary', 'newcategory', 'diabetes'];

      if (typesWithImages.includes(deleteModal.resourceType) && deleteModal.pic !== 'nopic') {
        const imagehad = await getResources('imagehandle');
        // console.log("imagehad: ", imagehad);

        const image = imagehad.find(item => item.url === deleteModal.pic);
        // console.log("image : ", image);

        if (image) {
          await deleteImage(image.fileId);
          await deleteResource("imagehandle", image._id);
        }
      }
      await deleteResource(deleteModal.resourceType, deleteModal.id);

      setDeleteModal({ open: false, resourceType: '', id: '' });
      setItemsToDelete(prev => prev.filter(item => item._id !== deleteModal.id));
    } catch (error) {
      console.error('Error deleting resource:', error);
    } finally {
      setDeleting(false);
    }
  };
  
  const cancelDelete = () => {
    setDeleteModal({ open: false, resourceType: '', id: '' });
  };

  return (
    <div className="admin-page">
      <NavBarAdmin />
      <div className='selectionsection'>
        <button className='but add' onClick={() => setSelection('add')}><p>Add</p></button>
        <button className='but delete' onClick={() => setSelection('delete')}><p>Delete</p></button>
      </div>

      <div className={`addsection ${selection === 'add'? 'show' : 'hide'}`}>
        <div className="admin-hero">
          <div className="admin-hero-content">
            <h1 className="admin-title">#Welcome Jonathan👋</h1>
            <div className="admin-links-grid">
              {sections.map(({ id, label }) => (
                <div
                  key={id}
                  className="admin-link"
                  onClick={() => handleScroll(id)}
                  tabIndex={0}
                  role="button"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-content">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="admin-section">
              <h2>{section.label}</h2>
              {section.id === 'poem' && (
                <PoemCard categories={["Category 01", "Category 02", "Category 03"]} />
              )}
              {section.id === 'essay' && (
                <EssayCard />
              )}
              {section.id === 'racconti' && (
                <RaccontiCard />
              )}
              {section.id === 'diabetes' && (
                <DiabetesCard />
              )}
              {section.id === 'picture' && (
                <PictureCard />
              )}
              {section.id === 'literarydiary' && (
                <LiteraryDiaryCard />
              )}
              {section.id === 'newcategory' && (
                <NewCategoryCard />
              )}
              <p>{section.id !== 'poem' && section.id !== 'essay' && section.id !== 'racconti' && section.id !== 'diabetes' && section.id !== 'picture' && section.id !== 'literarydiary' && section.id !== 'newcategory' && `Section for ${section.label}...`}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`deletesection ${selection === 'delete'? 'show' : 'hide'}`}>
        <div className="admin-hero">
          <div className="admin-hero-content">
            <h1 className="admin-title">#Welcome Jonathan👋</h1>
            <div className="admin-links-grid">
              {sections2.map(({ id, label }) => (
                <div
                  key={id}
                  className="admin-link"
                  onClick={() => handleClick(id)}
                  tabIndex={0}
                  role="button"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-content">
          <div className='card'>
            {itemsToDelete.length === 0 ? (
              <h1 className='delete-heading'>Click one to delete</h1>
            ) : (
              <h1 className='delete-heading'>Delete {heading}</h1>
            )}
            <div className='item-list'>
              {itemsToDelete.map((item) => (
                <div key={item._id} className="delete-preview">
                  <div className="delete-content">
                    <h3>{item.heading || item.newCategoryName}</h3>
                    {item.picture && item.picture !== "noPic" && (
                      <img src={item.picture} alt={item.heading} className="thumbnail" />
                    )}
                    <p
                      dangerouslySetInnerHTML={{
                        __html: (
                          ids === 'newcategory'
                            ? item.categoryFor
                            : item[heading]
                        )
                          ?.replace(/<img[^>]*>/g, '')
                          .slice(0, 100) + '...'
                      }}
                    ></p>
                  </div>
                  {
                    item.picture && item.picture !== "noPic" ?
                      <button 
                        className='delete-button' 
                        onClick={() => handleDeleteClick(heading, item._id, item.picture)}
                      >
                        Delete
                      </button>
                      :
                      <button 
                      className='delete-button' 
                      onClick={() => handleDeleteClick(heading, item._id, "nopic")}
                    >
                      Delete
                    </button>
                  }
                </div>
              ))}
            </div>
          </div>

        </div>
        {deleteModal.open && (
          <div className="modal-backdrop-delete">
            <div className="modal-content-delete card">
              <b><p>Are you sure you want to delete this {deleteModal.resourceType}?</p></b>
              <button 
                className='del-but' 
                onClick={confirmDelete} 
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button 
                className='del-but' 
                onClick={cancelDelete} 
                disabled={deleting}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
