import ImageKit from "imagekit-javascript";
import axios from 'axios';

// ImageKit configuration
const imagekit = new ImageKit({
    publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
    authenticationEndpoint: import.meta.env.VITE_IMAGEKIT_AUTH_ENDPOINT
});

// Upload image to ImageKit
export const uploadImage = async (file, folder = "essays") => {
    try {
            // 1. Get auth params from backend
            const authRes = await fetch(`/api/auth/imagekit`);
            const authParams = await authRes.json();

            // 2. Upload image with auth
            const result = await imagekit.upload({
                file,
                fileName: `${Date.now()}_${file.name}`,
                folder,
                useUniqueFileName: true,
                tags: ["essays", "upload"],
                responseFields: ["isPrivateFile", "tags"],
                ...authParams // ⬅️ Must include token, signature, expire
            });
        return {
            success: true,
            url: result.url,
            fileId: result.fileId,
            name: result.name
        };
    } catch (error) {
        console.error("Image upload failed:", error);
        return {
            success: false,
            error: error.message
        };
    }
};

export const deleteImage = async (fileId) => {
    try {
        if (!fileId) {
            return { success: false, error: "Missing fileId" };
        }
        // await imagekit.deleteFile(fileId);
        await axios.delete('/api/auth/imagekit/delete', {
            data: { fileId }
        });
        return { success: true };
    } catch (error) {
        console.error("Image deletion failed:", error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Get image URL with transformations
// export const getImageUrl = (url, transformations = {}) => {
//     if (!url) return null;
    
//     const {
//         width,
//         height,
//         quality = 80,
//         format = "auto"
//     } = transformations;
    
//     let transformedUrl = url;
    
//     if (width || height) {
//         const params = [];
//         if (width) params.push(`w-${width}`);
//         if (height) params.push(`h-${height}`);
//         if (quality) params.push(`q-${quality}`);
//         if (format) params.push(`f-${format}`);
        
//         transformedUrl = `${url}?tr=${params.join(',')}`;
//     }
    
//     return transformedUrl;
// };

// Validate image file
export const validateImage = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    // console.log("here at imagekit")
    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: "Please select a valid image file (JPEG, PNG, GIF, WebP)"
        };
    }
    
    if (file.size > maxSize) {
        return {
            valid: false,
            error: "Image size should be less than 5MB"
        };
    }
    
    return { valid: true };
};

// Generate thumbnail URL
export const getThumbnailUrl = (url, size = 150) => {
    return getImageUrl(url, { width: size, height: size, quality: 70 });
};

// Generate preview URL
// export const getPreviewUrl = (url, width = 800) => {
//     return getImageUrl(url, { width, quality: 85 });
// };

export default imagekit; 