import React from "react";
import CategoryCard from './CategoryCard';
import { useRouteLoaderData } from "react-router-dom";

import './Shop.css';

const ShopHome = () => {
  const { categories } = useRouteLoaderData('root');
  return (
    <>
      <div className=" px-10 py-10">
        <div className="page-title-font py-2">
          <h2>Shop</h2>
        </div>
        <div className="pt-2 pb-10">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.</p>
        </div>
        
        <div className='container mx-auto'>
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,200px)] gap-x-4 grid-gap-y-2">
          {
            // only render currentGridItems (i.e. current subset of products based on pagination)
            categories.map((category) => {
              return (
                <CategoryCard key={category.id} category={category} />
              );
            })
          }
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopHome;