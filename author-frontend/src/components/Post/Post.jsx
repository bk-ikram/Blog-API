import { DateTime } from 'luxon';
import Comment from '../Comment/Comment.jsx';
import styles from "./Post.module.css";
import { deletePost } from "../../api/requests.js"
import { useState } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Post ({id, title, content, author,time, comments, published, removePost, removeComment}){
    const [error, setError] = useState('');
    const { apiFetch } = useOutletContext();
    const timeAgo = DateTime.fromISO(time).toRelative();
    const navigate = useNavigate();


    async function handleDelete(){
        try{
            //send post request to delete post
            const result = await deletePost(apiFetch,id);
            //remove post from UI
            removePost(id);
        }
        catch(err){
            const message =
                err?.data?.message ||
                err?.message ||
                "Something went wrong";

            setError(message);
        }

    }

    async function handleModify(){
        return navigate(`/post/${id}/edit`, {state: {post: {id, title, content, published}}});
    }

    return (
        <div className={styles.postDiv}>
            {error && <h3>{error}</h3>}
            <h1>{title}</h1>
            <h3 >{published}</h3>
            {!published && <h3 style={{color:"yellow"}}>Not Published!</h3>}
            <h4>By: {author} @{timeAgo}</h4>
            <p>{content}</p>
            { comments.length > 0
            && 
            <>
                <hr/>
                <h3>Comments</h3>
            </>
            }
            {
                comments && comments.map( c => 
                <Comment 
                key= { c.id } 
                id = { c.id }
                content= { c.content }
                guestName = { c.guestName }
                createdAt = { c.createdAt }
                postId = {id}
                removeComment = {removeComment}
                /> )
                
            }
            <button onClick={() => handleModify()}>Modify</button>
            <button onClick={() => handleDelete()}>Delete</button>
        </div>
    )
}