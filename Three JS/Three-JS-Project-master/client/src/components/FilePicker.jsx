import React from 'react';
import CustomButton from './CustomButton';

const FilePicker = ({ file, setfile, readfile }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setfile(selectedFile);
    }
  };

  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input type="file" accept='image/*' id='file-upload' onChange={handleFileChange} />
        <label htmlFor='file-upload' className='filepicker-label'>
          Upload File
        </label>

        <p className='mt-2 text-gray500 text-sm truncate'>
          {file === '' ? 'No files selected' : file.name}
        </p>

        <div className='mt-4 flex flex-col gap-3'>
          <CustomButton
            type='outline'
            title='Logo'
            handleClick={() => {
              if (file) {
                readfile('logo');
              }
            }}
            customStyles='text-sm'
          />
          <CustomButton
            type='filled'
            title='Full'
            handleClick={() => {
              if (file) {
                readfile('full');
              }
            }}
            customStyles='text-sm'
          />
        </div>
      </div>
    </div>
  );
};

export default FilePicker;
