import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const api = import.meta.env.VITE_UNSPLASH_API_KEY;

  const handleSearch = async () => {
    setError('');
    if (!searchTerm.trim()) {
      setError('Enter a search term.');
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query: searchTerm },
        headers: {
          Authorization: `Client-ID ${api}`
        }
      });
      if (response.data.results.length === 0) {
        setError('No images found. Try something else');
        setImages([]);
      } else {
        setImages(response.data.results);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to fetch images.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (imageUrl) => {
    try {
      navigate('/canvas-editor', { state: { image: imageUrl } });
    } catch (error) {
      console.error('Error navigating to canvas editor:', error);
      setError('Failed to navigate to the editor.');
    }
  };
  // console.log(images)
  return (
    <div className="container mx-auto py-4">
      <div className='w-full p-5'>
        <h1 className='text-xl font-semibold'>Name:- Rajan Pandey</h1>
        <h2 className='text-xl font-semibold'>Email:- rajanpandeygiit31078379@gmail.com</h2>
      </div>
      <div className="flex flex-col items-center mt-4">
        <h1 className="text-4xl font-bold mb-4">Search Any Image for Editing in Canvas</h1>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            className="border border-gray-300 px-4 py-2 rounded-2xl"
            placeholder="Enter your search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-gray-700 text-white px-4 py-2 rounded-xl"
          >
            Search
          </button>
        </div>
        
        {error && <p className="text-red-500 mb-5">{error}</p>}
        
        {loading ? (
          <p>Please wait Loading...</p>
        ) : (
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative">
                <img src={image.urls.small} alt={image.alt_description} />
                <button
                  className="absolute bottom-1 left-2 bg-white px-4 py-2"
                  onClick={() => handleImageSelect(image.urls.small)}
                >
                  Add Caption
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
