/** 
 * Methods for generating the About page
 * 
 * @module AboutBackend
 * 
 */

import React from "react";
import CodeIcon from '@mui/icons-material/Code';

const AboutBackend = () => {
  return (
    <>
      <div className=" px-6 py-10">
        <div className='container mx-auto'>
          <h2 className='page-title-font py-2'>Backend</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
            <div className="col-span-2 pt-4">
              <h1 className="text-xl mb-4 mt-4 font-extrabold">Technologies</h1>
              The backend code implements a server and API which serves http requests and performs database reads, writes and updates.
              The backend server/API was created using the following technologies:

              <div className="" style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                <table className='py-10 px-10 table-auto'>
                  <thead>
                    <tr>
                      <th className="font-bold border-b b--black-20 py-6 text-left">Package</th>
                      <th className="font-bold border-b b--black-20 py-6 text-left">Description and Application</th>
                    </tr>
                  </thead>
                  <tr>
                    <td className='border-b b--black-20 py-3 pr-3 text-left underline'><a className='link cursor-pointer font-bold' href='https://nodejs.org/en'>Node.js</a></td>
                    <td className='border-b b--black-20 py-3 text-left'>
                      Javascript runtime which provides javascript in a server environment (outside the web browser).
                    </td>
                  </tr>
                  <tr >
                    <td className='border-b b--black-20 py-3 pr-3 text-left underline'><a className='link cursor-pointer font-bold' href='https://expressjs.com/'>Express</a></td>
                    <td className='border-b b--black-20 py-3 text-left'>
                      A server framework for Node.js which provides a straightforward means of configuring a http server and routes.
                    </td>
                  </tr>
                  <tr>
                    <td className='border-b b--black-20 py-3 pr-3 text-left underline'><a className='link cursor-pointer font-bold' href='https://knexjs.org/'>knex</a></td>
                    <td className='border-b b--black-20 py-3 text-left'>
                      Knex is a SQL query builder. It is used in the application to perform create, read and update records in the PostgreSQL database.
                    </td>
                  </tr>
                  <tr>
                    <td className='border-b b--black-20 py-3 pr-3 text-left underline'><a className='link cursor-pointer font-bold' href='https://www.npmjs.com/package/express-session'>express-session</a></td>
                    <td className='border-b b--black-20 py-3 text-left'>
                      Express-session is a module for express which is used to create a session after the user logs in.
                    </td>
                  </tr>
                  <tr>
                    <td className='border-b b--black-20 py-3 pr-3 text-left underline'><a className='link cursor-pointer font-bold' href='https://www.npmjs.com/package/connect-session-knex'>Connect Session knex</a></td>
                    <td className='border-b b--black-20 py-3 text-left'>
                      Uses knex to store session data in the database
                    </td>
                  </tr>
                </table>
              </div>

              <br></br>
              <h1 className="text-xl mb-4 mt-4 font-extrabold">Docker</h1>
              <p>
                The backend application can be configured to use Docker containers both the server/API and database or for the server/API only.
                Docker files are provided in the source repository for the following three sample configurations:
                <ol className="pl-3 list-decimal list-inside">
                  <li>
                    <b>Without Docker:</b> Where Docker is not required or not available the application can be run standalone
                    without creating Docker containers.
                  </li>
                  <li>
                    <b>Single Docker Container:</b> This configuration uses a docker container for the server/API only
                    and connects to the database service on a remote or local machine.
                  </li>
                  <li>
                    <b>Two Docker Containers:</b> Both the server/API and database run in containers.
                    This configuration may be useful for local development where a PostgreSQL database service is not available.
                  </li>
                </ol>
              </p>
              <img className="py-12" alt='docker' src='../images/docker.png' />


            </div>
            <div className="flex justify-center items-center">
              <CodeIcon sx={{ fontSize: 250 }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutBackend;