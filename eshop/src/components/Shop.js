import React, { useState } from "react";
import CategoryCard from './CategoryCard';
import ProductGrid from "./ProductGrid";
import ProductView from "./ProductView";

import './Shop.css';
import 'tachyons';

const Shop = ({ products, categories, routes, selectedCategory, onSelectCategory, route, onRouteChange, onAddToCart }) => {

  const [selectedProduct, setSelectedProduct] = useState(null);

  const onSelectProduct = (id) => {
    console.log(id);
    setSelectedProduct(id);
    onRouteChange(routes.SHOP_PRODUCT);
  }

  let rightPaneContent = null;
  let display = null;
  switch (route) {
    case (routes.SHOP_GRID):
      rightPaneContent = <ProductGrid products={products} categories={categories} categoryId={selectedCategory} onSelectProduct={onSelectProduct} />
      break;
    case (routes.SHOP_PRODUCT):
      rightPaneContent = <ProductView product={products[selectedProduct]} routes={routes} onRouteChange={onRouteChange} onAddToCart={onAddToCart} />
      break;
    default:
      // for SHOP_HOME route, there's only one pane
      display = shopHome(categories, onSelectCategory);
      break;
  }

  if (rightPaneContent) {
    display =
      <>
        <div className='flex-container'>
          <div className='flex-row'>
            <div className='nav-pane'>

              <h3>Navigation</h3>
              <h4 onClick={() => onRouteChange(routes.HOME)}>Home</h4>
              <h4 onClick={() => onRouteChange(routes.ABOUT)}>About</h4>
              <h4 onClick={() => onRouteChange(routes.SHOP_HOME)}>Shop</h4>
              <ul>
                {
                  categories.map((category) => {
                    let className = '';
                    if (category.id === selectedCategory) {
                      className = 'white';
                    }
                    return (<li className={className} onClick={() => onSelectCategory(category.id)}>{category.title}</li>);
                  })
                }
              </ul>
              <h4 onClick={() => onRouteChange(routes.CONTACT)}>Contact</h4>
            </div>
            <div className='product-pane'>
              {rightPaneContent}
            </div>
          </div>
        </div>
      </>
  }

  return (
    <>
      {display}
    </>
  );
}

const shopHome = (categories, onSelectCategory) => {
  return (
    <>
      <div className='ml5 mr5'>
        <h1>Shop</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.</p>

        <div className='grid-container'>
          {
            // only render currentGridItems (i.e. current subset of products based on pagination)
            categories.map((category) => {
              return (
                <CategoryCard category={category} onSelectCategory={onSelectCategory} />
              );
            })
          }
        </div>
      </div>
    </>
  );
}

export default Shop;
