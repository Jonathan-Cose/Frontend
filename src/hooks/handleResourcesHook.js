import { useState } from "react";
import { toast } from 'react-hot-toast';

function handleInputErrors({ heading, category, text, pic, type }) {
    if (type === "poem") {
        if (!heading || !category || !text) {
            toast.error("Heading, category and text cannot be empty");
            return false;
        }
        return true;
    }

    if (type === "essay") {
        if (!heading || !text || !pic) {
            toast.error("Heading, text, and image must be provided");
            return false;
        }
        return true;
    }

    if (type === "racconti") {
        if (!heading || !text) {
            toast.error("Heading and text must be provided");
            return false;
        }
        return true;
    }

    if (type === "diabetes") {
        if (!heading || !text) {
            toast.error("Heading and text must be provided");
            return false;
        }
        return true;
    }

    if (type === "addnewcat") {
        if (!heading || !text) {
            toast.error("Heading and text must be provided");
            return false;
        }
        return true;
    }

    if (type === "picture") {
        if (!category || !pic) {
            toast.error("Category and image must be provided");
            return false;
        }
        return true;
    }

    if (type === "literaryDiary") {
        if (!heading || !text || !pic || !category) {
            toast.error("Heading, Body, category, and image must be provided");
            return false;
        }
        return true;
    }
    if (type === "picturehandle") {
        if (!heading || !text || !pic || !category) {
            toast.error("Issue occured");
            return false;
        }
        return true;
    }

    return false;
}

const useResources = () => {
    const [loading, setLoading] = useState(false);
    const [resources, setResources] = useState([]);

    // Get all resources
    const getResources = async (resourceType) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/getresources/get${resourceType}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const responseText = await res.text();
            if (!res.ok) {
                let errorMessage = `Failed to fetch ${resourceType}`;
                try {
                    const errorData = JSON.parse(responseText);
                    errorMessage = errorData.error || errorData.message || errorMessage;
                } catch {}
                toast.error(errorMessage);
                return;
            }
            let data;
            try {
                data = JSON.parse(responseText);
                // console.log("data", data)
            } catch {
                toast.error("Invalid response from server");
                return;
            }
            setResources(data);
            return data;
        } catch (error) {
            toast.error(error.message || "Network error occurred");
        } finally {
            setLoading(false);
        }
    };

    // Create new resource
    const createResource = async ({ heading, category, text, pic, type }) => {
        // console.log("Here in hook",category,heading, text,pic,type);
        const success = handleInputErrors({ heading, category, text, pic, type });
        
        if (!success) return;
        setLoading(true);

        try {
            let res;
            
            if(type === "poem") {
                // console.log("Before the api call:", heading, category, text)
                res = await fetch(`/api/addresources/addpoem`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ heading, category, text }),
                });
            }
            if (type === "essay") {
                res = await fetch(`/api/addresources/addessay`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ heading, category, text, pic }),
                });
            }
            if(type === "racconti") {
                res = await fetch(`/api/addresources/addracconti`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ heading, category, text }),
                });
            }
            if(type === "diabetes") {
                // console.log("Here before api call",category,heading, text,pic,type);
                res = await fetch(`/api/addresources/adddiabetes`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ heading, category, text, pic }),
                });
            }
            if(type === "addnewcat") {
                res = await fetch(`/api/addresources/addnewcategory`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ heading, category, text ,pic}),
                });
            }
            if (type === "picture") {
                res = await fetch(`/api/addresources/addpicture`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ category, pic }),
                });
            }
            if (type === "literaryDiary") {
                res = await fetch(`/api/addresources/addliterarydiary`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ heading, category, text, pic }),
                });
            }
            if (type === "picturehandle") {
                // console.log("im here in picturehandle", heading, category, text, pic)
                res = await fetch(`/api/addresources/addimagehandle`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ heading, category, text, pic }),
                });
            }

            const responseText = await res.text();
            if (!res.ok) {
                let errorMessage = `Failed to create ${type}`;
                try {
                    const errorData = JSON.parse(responseText);
                    errorMessage = errorData.error || errorData.message || errorMessage;
                } catch {}
                toast.error(errorMessage);
                return;
            }
            let data;
            try {
                data = JSON.parse(responseText);
            } catch {
                toast.error("Invalid response from server");
                return;
            }
            setResources(prev => [...prev, data]);
            toast.success(`${type} created successfully!`);
            return data;
        } catch (error) {
            toast.error(error.message || "Network error occurred");
        } finally {
            setLoading(false);
        }
    };

    //Update resource
    const updateResource = async (visibilityValue) => {
        if (!visibilityValue) return;
        
        setLoading(true);
        try {
            const res = await fetch(`/api/updateresources/updatediabetesvisibility`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                _id: visibilityValue._id,
                visibility: visibilityValue.visibility }),
            });

            const responseText = await res.text();

            if (!res.ok) {
            let errorMessage = `Failed to update diabetes visibility`;
            try {
                const errorData = JSON.parse(responseText);
                errorMessage = errorData.error || errorData.message || errorMessage;
            } catch {}
            toast.error(errorMessage);
            return;
            }

            let data;
            try {
            data = JSON.parse(responseText);
            } catch {
            toast.error("Invalid response from server");
            return;
            }

            toast.success(`Diabetes visibility updated!`);
            return data;
        } catch (error) {
            toast.error(error.message || "Network error occurred");
        } finally {
            setLoading(false);
        }
    };

    const deleteResource = async (resourceType, id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/deleteresources/${resourceType}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            const responseText = await res.text();
            if (!res.ok) {
                let errorMessage = `Failed to delete ${resourceType}`;
                try {
                    const errorData = JSON.parse(responseText);
                    errorMessage = errorData.error || errorData.message || errorMessage;
                } catch {}
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
            setResources(prev => prev.filter(resource => resource._id !== id));
            toast.success(`${resourceType} deleted successfully!`);
            return true; 
        } catch (error) {
            toast.error(error.message || "Network error occurred");
            throw error; 
        } finally {
            setLoading(false);
        }
    };

    // Get single resource by ID
    // const getResourceById = async (resourceType, id) => {
    //     setLoading(true);
    //     try {
    //         const res = await fetch(`/api/${resourceType}/${id}`, {
    //             method: "GET",
    //             headers: { "Content-Type": "application/json" },
    //         });
    //         const responseText = await res.text();
    //         if (!res.ok) {
    //             let errorMessage = `Failed to fetch ${resourceType}`;
    //             try {
    //                 const errorData = JSON.parse(responseText);
    //                 errorMessage = errorData.error || errorData.message || errorMessage;
    //             } catch {}
    //             toast.error(errorMessage);
    //             return;
    //         }
    //         let data;
    //         try {
    //             data = JSON.parse(responseText);
    //         } catch {
    //             toast.error("Invalid response from server");
    //             return;
    //         }
    //         return data;
    //     } catch (error) {
    //         toast.error(error.message || "Network error occurred");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return { 
        // loading, 
        // resources, 
        getResources, 
        createResource, 
        updateResource, 
        deleteResource, 
        // getResourceById 
    };
};

export default useResources; 