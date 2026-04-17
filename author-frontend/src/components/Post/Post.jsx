import { DateTime } from 'luxon';
import Comment from '../Comment/Comment.jsx';
import styles from "./Post.module.css"

export default function Post ({title, content, author,time, comments, published}){
    const timeAgo = DateTime.fromISO(time).toRelative();
    return (
        <div className={styles.postDiv}>
            <h1>{title}</h1>
            <h3 >{published}</h3>
            {!published && <h3 style={{color:"yellow"}}>Not Published!</h3>}
            <h4>By: {author} @{timeAgo}</h4>
            <p>{content}</p>
            {
                comments && comments.map( c => 
                <Comment 
                key= { c.id } 
                data= { c }
                /> )
                
            }
        </div>
    )
}