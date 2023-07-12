/** 
 * Methods for generating the Contact page
 * 
 * @module Contact
 * 
 */

import React from "react";
import ContactsIcon from '@mui/icons-material/Contacts';

const Contact = () => {
  return (
    <>
      <div className=" px-6 py-10">
        <div className='container mx-auto'>
          <h2 className='page-title-font py-2'>Contact</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
            <div className="col-span-2 pt-4">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was popularised in
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.</p>
                <br></br>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was popularised in
                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.</p>
            </div>
            <div className="flex justify-center">
              <ContactsIcon sx={{ fontSize: 250 }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;