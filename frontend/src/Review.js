import React, { useContext } from 'react';
import { TagContext } from './TagContext';

function Review() {
  const { tags, removeTag } = useContext(TagContext);

  return (
    <div>
      <h2>Review Tags</h2>
      {tags.map((tag, index) => (
        <div key={index}>
          <p>
            Tag {index + 1}: Position ({tag.x}, {tag.y})
          </p>
          <button onClick={() => removeTag(tag)}>Remove Tag</button>
        </div>
      ))}
    </div>
  );
}

export default Review;
