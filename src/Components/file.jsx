import React from 'react';

const File = ({ fileName, fileType,fileUrl }) => {
    const getImagePath = (fileType) => {
        switch (fileType) {
            case 'avi':
                return require('../images/files/avi.png');
            case 'css':
                return require('../images/files/css.png');

            case 'doc':
                return require('../images/files/doc.png');

            case 'exe':
                return require('../images/files/exe.png');
            case 'gif':
                return require('../images/files/gif.png');
            case 'jpg':
                return require('../images/files/jpg.png');

            case 'mp4':
                return require('../images/files/mp4.png');
            case 'pdf':
                return require('../images/files/pdf.png');
            case 'png':
                return require('../images/files/png.png');
            case 'ppt':
                return require('../images/files/ppt.png');
            case 'rar':
                return require('../images/files/rar.png');

            case 'svg':
                return require('../images/files/svg.png');
            case 'txt':
                return require('../images/files/txt.png');
            case 'wav':
                return require('../images/files/wav.png');
            case 'xls':
                return require('../images/files/xls.png');
            case 'xml':
                return require('../images/files/xml.png');
            case 'zip':
                return require('../images/files/zip.png');
            default:
                return require('../images/files/default.png');
        }
    };

    return (
        <a href={fileUrl} download={fileName} className='file-link'>
        <div className='file'>
            <div className='file-icon'>
                <img src={getImagePath(fileType)} alt={fileType} />
            </div>
            <div className='file-title'>{fileName}</div>
        </div>
        </a>
    );
};

export default File;
