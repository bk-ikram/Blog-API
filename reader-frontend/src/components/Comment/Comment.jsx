import { DateTime } from 'luxon';


export default function Comment ({content, guestName, createdAt}){
    const timeAgo = DateTime.fromISO(createdAt).toRelative();
    return (
        <div>
            <h5>By: {guestName} @{timeAgo}</h5>
            <p>{content}</p>
        </div>
    )
}