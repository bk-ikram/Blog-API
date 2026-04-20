import { DateTime } from 'luxon';
import { deleteComment } from '../../api/requests';
import { useOutletContext } from "react-router-dom";
import { useState } from "react";


export default function Comment ({postId, id, content, guestName, createdAt, removeComment}){
    const timeAgo = DateTime.fromISO(createdAt).toRelative();
    const { apiFetch } = useOutletContext();
    const [error, setError] = useState('');

    async function handleDelete(){
        try{
            //send post request to delete post
            const result = await deleteComment(apiFetch,id);
            //remove post from UI
            removeComment(postId, id);
        }
        catch(err){
            const message =
                err?.data?.message ||
                err?.message ||
                "Something went wrong";

            setError(message);
        }
    }

    return (
        <div>
            <h5>By: {guestName} @{timeAgo}</h5>
            <p>{content}</p>
            <button onClick={() => handleDelete()}>Delete</button>
        </div>
    )
}