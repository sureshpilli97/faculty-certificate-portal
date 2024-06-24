import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import '../Styles/FileDropzoneStyle.css';

const FileDropzone = ({ setFieldValue }) => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      'application/pdf': [],
      'image/jpeg': [],
      'image/png': []
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFieldValue("certificate", acceptedFiles[0]);
    }
  });

  const files = acceptedFiles.map(file => (
    <p key={file.path}>
      {file.path}
    </p>
  ));

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      <FontAwesomeIcon icon={faFileUpload} className='icon-class' />
      <p>Drag 'n' drop or click to select a file</p>
      <aside>
        {files}
      </aside>
    </div>
  );
};

export default FileDropzone;
