import React, { createContext, useState } from 'react';

const TagContext = createContext();

function TagProvider({ children }) {
  const [tags, setTags] = useState([]);

  const addTag = (tag) => {
    setTags([...tags, tag]);
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <TagContext.Provider value={{ tags, addTag, removeTag }}>
      {children}
    </TagContext.Provider>
  );
}

export { TagContext, TagProvider };
