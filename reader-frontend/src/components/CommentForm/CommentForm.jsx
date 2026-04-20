import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { postComment } from "../../api/requests";



export default function CommentForm({postId, toggleShowCommentForm, addComment}){
    const [error, setError] = useState('');
    const { apiFetch } = useOutletContext();

    async function handleSubmit(e,apiFetch){
        e.preventDefault(); //prevent page refresh
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log("reached handle submit");
        try{
            const comment = await postComment(apiFetch,formJson);

            addComment(postId, comment);
            toggleShowCommentForm();
        }
        catch(err){
            setError(err.message);
        }

        
    }

    return (
        <div>
        {error && <h3>{error}</h3>}
        <form onSubmit={(e)=>handleSubmit(e,apiFetch)} >
            <input hidden id="id" name="id" defaultValue={postId} />
            <p><label htmlFor="guestname">Guest Name</label><input id="guestname" name="guestname" type="text" /></p>
            <p><label htmlFor="content">Content</label><textarea id="content" name="content" rows="2" cols="50"/></p>
            <button type="submit">Submit</button>
        </form>
        </div>
    )
}