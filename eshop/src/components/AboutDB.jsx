/** 
 * Methods for generating the About page
 * 
 * @module AboutFrontend
 * 
 */

import React from "react";
import StorageIcon from '@mui/icons-material/Storage';

const AboutDB = () => {
  return (
    <>
      <div className=" px-6 py-10">
        <div className='container mx-auto'>
          <h2 className='page-title-font py-2'>Database</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
            <div className="col-span-2 pt-4">
              A PostgreSQL database is used to persist data for the application. This includes product data, user profiles, login details and cart contents for each user.
              The database schema is illustrated below.

              <img className="py-12" alt='db_schema' src='../images/DB_schema.png'  />

            </div>
            <div className="flex justify-center items-center">
              <StorageIcon sx={{ fontSize: 250 }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutDB;