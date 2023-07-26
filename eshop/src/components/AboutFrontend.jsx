/** 
 * Methods for generating the About page
 * 
 * @module AboutFrontend
 * 
 */

import React from "react";

const AboutFrontend = () => {
  return (
    <>
      <div className=" px-6 py-10">
        <div className='container mx-auto'>
          <h2 className='page-title-font py-2'>Frontend</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
            <div className="col-span-2 pt-4">
              The frontend is a React application which was created using the following technologies:
              <div className="" style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                <table className='py-10 px-10 table-auto'>
                  <thead>
                    <tr>
                      <th className="font-bold border-b b--black-20 py-6 text-left">Package</th>
                      <th className="font-bold border-b b--black-20 py-6 text-left">Description and Application</th>
                    </tr>
                  </thead>
                  <tbody>

                  
                  <tr>
                    <td className='border-b b--black-20 py-3 pr-3 text-left underline'><a className='link cursor-pointer font-bold' href='https://react.dev/'>React.js</a></td>
                    <td className='border-b b--black-20 py-3 text-left'>
                      Javascript framework for user interfaces. Used to create page components such as product cards, cart page, page top banner and footer.
                    </td>
                  </tr>
                  <tr >
                    <td className='border-b b--black-20 py-3 pr-3 text-left underline'><a className='link cursor-pointer font-bold' href='https://reactrouter.com/'>React Router</a></td>
                    <td className='border-b b--black-20 py-3 text-left'>
                      Used to configure page routes in the React application.
                    </td>
                  </tr>
                  <tr>
                    <td className='border-b b--black-20 py-3 pr-3 text-left underline'><a className='link cursor-pointer font-bold' href='https://www.npmjs.com/package/zustand'>Zustand</a></td>
                    <td className='border-b b--black-20 py-3 text-left'>
                      State management package. Tracks the sign-in status of the user.
                    </td>
                  </tr>
                  <tr>
                    <td className='border-b b--black-20 py-3 pr-3 text-left underline'><a className='link cursor-pointer font-bold' href='https://tailwindcss.com/'>Tailwind CSS</a></td>
                    <td className='border-b b--black-20 py-3 text-left'>
                      CSS Framework. Used to define page styles via pre-defined CSS classes.
                    </td>
                  </tr>
                  <tr>
                    <td className='border-b b--black-20 py-3 pr-3 text-left underline whitespace-nowrap'><a className='link cursor-pointer font-bold' href='https://create-react-app.dev'>Create React App</a></td>
                    <td className='border-b b--black-20 py-3 text-left'>
                      Creates a skeleton React project and provides tools for running the application.
                    </td>
                  </tr>
                  <tr>
                    <td className='border-b b--black-20 py-3 pr-3 text-left underline'><a className='link cursor-pointer font-bold' href='https://jsdoc.app/'>JSDoc</a></td>
                    <td className='border-b b--black-20 py-3 text-left'>
                      Generates documentation based on JavaScript code comments.
                    </td>
                  </tr>
                  <tr>
                    <td className='border-b b--black-20 py-3 pr-3 text-left underline'><a className='link cursor-pointer font-bold' href='https://mui.com/core/'>mui-core</a></td>
                    <td className='border-b b--black-20 py-3 text-left'>
                      Icons and selected UI components
                    </td>
                  </tr>
                  <tr>
                    <td className='border-b b--black-20 py-3 pr-3 text-left underline'><a className='link cursor-pointer font-bold' href='https://www.iconfinder.com/iconsets/geek-3'>Geek Icon Pack</a></td>
                    <td className='border-b b--black-20 py-3 text-left'>
                      Dummy product images
                    </td>
                  </tr>
                  <tr>
                    <td className='border-b b--black-20 py-3 pr-3 text-left underline whitespace-nowrap'><a className='link cursor-pointer font-bold' href='https://www.cufonfonts.com/font/manolo-mono'>Manolo Mono Font</a></td>
                    <td className='border-b b--black-20 py-3 text-left'>
                      Title font
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <br></br>
            </div>
            <div className="flex justify-center items-center">
              <div className="">
                <img alt="logo" src='../images/react.png' width={250} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutFrontend;