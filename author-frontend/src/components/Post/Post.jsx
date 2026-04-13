import { DateTime } from 'luxon';
import Component from '../Comment/Comment.jsx';

export function Post (title, content, author,time, comments){
    const timeAgo = DateTime.fromISO(time).toRelative();
    return (
        <div>
            <h1>{title}</h1>
            <h4>By: {author} @{timeAgo}</h4>
            <p>{content}</p>
            {
                comments.map( c => 
                <Comment 
                key= { c.id } 
                data= { c }
                /> )
            }
        </div>
    )
}