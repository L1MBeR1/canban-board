import React from 'react';
import { format } from 'date-fns';

const Comment = ({ author, message, postDate }) => {
    return (
        <div className='comment'>
            <div className='comment-author'>{author}</div>
            <div className='comment-text'>{message}</div>
            <div className='comment-time'>{format(new Date(postDate), 'dd.MM.yyyy HH:mm:ss')}</div>
        </div>
    );
};

export default Comment;