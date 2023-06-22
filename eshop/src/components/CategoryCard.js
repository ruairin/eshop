import React from "react";
import 'tachyons';

const CategoryCard = ({ category, onSelectCategory }) => {
  const { id, title, image } = category;
  return (
    <div className='bg-light-green dib br3 pa3 ma2' onClick={() => onSelectCategory(id)}>
      {/* Note: /images/ below refers to the images folder within /public/ */}
      <img alt='robots' src={`/images/${image}`} width={300} />
      <div>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

export default CategoryCard;

