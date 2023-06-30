import React from "react";

const Footer = () => {

  return (
    <footer>
      <div className='my-10 py-10 z-50 w-full h-30 bg-[#5B3417] border-b-[1px] z-index-1 sticky top-0 border-b-gray-500 font-titleFont text-white'>
        <div className='max-w-screen-xl h-full mx-auto flex items-center justify-center'>
          <div className='container mx-auto'>
            <div className='grid grid-cols-2 gap-6'>
              <div>
                <h1 className='footer-title-font underline'>Contact</h1>
                <ul>
                  <li>Address Line 1</li>
                  <li>Address Line 2</li>
                  <li>County</li>
                  <li>Country</li>
                  <li>Eircode</li>
                </ul>
              </div>
              <div>
                <h1 className='footer-title-font underline'>Opening Hours</h1>
                <ul>
                  <li>Mon-Fri: 9:00 - 17:00</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
