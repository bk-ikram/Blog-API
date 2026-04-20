import { DateTime } from 'luxon';
import Comment from '../Comment/Comment.jsx';
import CommentForm from '../CommentForm/CommentForm.jsx';
import styles from "./Post.module.css";
import { useState } from 'react';

export default function Post ({id, title, content, author,time, comments, published, removePost, addComment}){
    const [error, setError] = useState('');
    const [showCommentForm, setShowCommentForm] = useState(false);
    const timeAgo = DateTime.fromISO(time).toRelative();

    function toggleShowCommentForm(){
        return setShowCommentForm(prev => !prev)
    }

    return (
        <div className={styles.postDiv}>
            {error && <h3>{error}</h3>}
            <h1>{title}</h1>
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
                content= { c.content }
                guestName = { c.guestName }
                createdAt = { c.createdAt }
                /> )
                
            }
            {showCommentForm &&
             <CommentForm
                postId = {id}
                toggleShowCommentForm = {toggleShowCommentForm}
                addComment = { addComment }
             />
             }
            <button onClick={() => toggleShowCommentForm()}>{ showCommentForm ? "Cancel" : "Comment" }</button>
        </div>
    )
}