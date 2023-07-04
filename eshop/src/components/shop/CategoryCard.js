import React from "react";
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CategoryCard = ({ category }) => {
  const { id, title, image_name, description } = category;
  return (
    <Link to={`/shop/category/${id}`}>
      <div className='group px-6 py-3 max-w-sm rounded overflow-hidden shadow-md'>
        {/* Note: /images/ below refers to the images folder within /public/ */}
        <img alt='category' src={`/images/${image_name}`} width={200} />
        <div className="px-6 py-4">
          <div className='font-bold text-xl mb-2'>
            {title}
          </div>
          <p className="text-gray-700 text-base">
            {description}
          </p>
          <div className="pt-4 text-right">
            <ArrowForwardIosIcon sx={{ fontSize: 40 }} className="px-2 py-2 text-orange-400 group-hover:bg-orange-400 group-hover:text-white" />
          </div>
        </div>
      </div>
      {/* </div> */}
    </Link >
  );
}

export default CategoryCard;

