import { DateTime } from 'luxon';


export function Comment (content, author,time){
    const timeAgo = DateTime.fromISO(time).toRelative();
    return (
        <div>
            <h4>{title}</h4>
            <h5>By: {author} @{timeAgo}</h5>
            <p>{content}</p>
            <form method="post" action="">
                <button type="submit">Delete</button>
            </form>
        </div>
    )
}