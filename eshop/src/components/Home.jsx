/** 
 * Methods for generating the Home page
 * 
 * @module Home
 * 
 */

import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

const Home = () => {
  return (
    <>
      <div className=" px-6 py-10">
        <div className='container mx-auto'>
          <h2 className='page-title-font py-2'>Home</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
            <div className="col-span-2 pt-4">
              <p>This is a partial template for an e-commerce web application developed using React.js (frontend),
                Node.js/Express.js (backend API) and using a PostgreSQL database.
                The application was created as a personal project for learning JavaScript, React.js, Node.js and SQL.
              </p>
              <br></br>
              <p>
                The applcation features the following:
                <ul className="list-disc list-inside">
                  <li>A Shop component which dynamically loads product data from a database</li>
                  <li>User registration </li>
                  <li>User sign in with persistance via sessions</li>
                  <li>Unique cart for each user (only available when signed in). Cart items are saved between sessions. </li>
                  <li>Responsive design in which page and menu display adapts to screen size </li>
                </ul>
              </p>
              <br></br>
              <p>
                Further information about the application is available in the&nbsp;
                <Link className="underline" href="#" title="Backend" to={'/about/backend'} >Frontend</Link>
                &nbsp;
                <Link className="underline" href="#" title="Backend" to={'/about/backend'} >Backend</Link>
                &nbsp;and&nbsp;
                <Link className="underline" href="#" title="Backend" to={'/about/backend'} >Database</Link>
                &nbsp;sections
              </p>
              <br></br>
              <p>
                The source code for the application is available on <a className='underline' href='https://github.com/ruairin/eshop'>GitHub</a>
              </p>
            </div>
            <div className="flex justify-center items-center">
              <HomeIcon sx={{ fontSize: 250 }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;