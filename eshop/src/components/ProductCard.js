import React from "react";
import 'tachyons';

const ProductCard = ({ product, onSelectProduct }) => {
  const { id, title, price, image } = product;
  return (
    <div className='bg-light-green dib br3 pa3 ma2'>
      {/* Note: /images/ below refers to the images folder within /public/ */}
      <img alt='robots' src={`/images/${image}`} width={300} />
      <div>
        <h2>{title}</h2>
        <p>{price}</p>
        <button onClick={() => onSelectProduct(id)}>View</button>
      </div>
    </div>
  );
}

export default ProductCard;