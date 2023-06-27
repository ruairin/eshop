import React from "react";
import { Link } from 'react-router-dom';
import 'tachyons';

const CategoryCard = ({ category }) => {
  const { id, title, image } = category;
  return (
    <Link to={`/shop/category/${id}`}>
      <div className='bg-light-green dib br3 pa3 ma2' >
        {/* Note: /images/ below refers to the images folder within /public/ */}
        <img alt='robots' src={`/images/${image}`} width={300} />
        <div>
          <h2>{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;

