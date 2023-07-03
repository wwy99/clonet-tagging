import React, { useState, useEffect } from 'react';

const images = [
  'image/Amiri18.png',
  'image/Amiri19.png',
  'image/Amiri20.png'
];

const defaultTagOptions = [
  { value: '', label: 'Select tag' },
  { value: '1', label: 'Brand Tag' },
  { value: '2', label: 'Wash Tag' },
  { value: '3', label: 'Unqualified or No Tag' },
  { value: '4', label: 'Both Tags Shown' }
];

function ImageTagging() {
  const [tag, setTag] = useState('');
  const [submittedTags, setSubmittedTags] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedTags = JSON.parse(localStorage.getItem('tags')) || [];
    setUsername(savedUsername || '');
    setSubmittedTags(savedTags);
  }, []);

  useEffect(() => {
    localStorage.setItem('username', username);
    localStorage.setItem('tags', JSON.stringify(submittedTags));
  }, [username, submittedTags]);

  const handleTagChange = event => {
    setTag(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`Submitted tag: ${tag}`);
    setSubmittedTags([...submittedTags, tag]);
    setTag('');
    nextImage();
  };

  const handleUndo = () => {
    setSubmittedTags(submittedTags.slice(0, -1));
  };

  const handleFlagAsUnsure = () => {
    console.log('Flagged image as unsure');
  };

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {images[currentImageIndex] && (
            <img src={process.env.PUBLIC_URL + images[currentImageIndex]} alt="Tagging" />
          )}
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="form-group">
            <label>
              Username:
              <input type="text" value={username} onChange={handleUsernameChange} className="form-control" />
            </label>
            <label>
              Tag:
              <select value={tag} onChange={handleTagChange} className="form-control">
                {defaultTagOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
            <button type="button" onClick={handleUndo} className="btn btn-warning mt-3 ml-2">Undo Last Tag</button>
            <button type="button" onClick={handleFlagAsUnsure} className="btn btn-danger mt-3 ml-2">Flag as Unsure</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ImageTagging;
