import { useNavigate, useOutletContext } from "react-router-dom";
import { upsertPost } from "../../api/requests";
import { useState } from "react";



export default function ManagePost(postDetails){
    const [error, setError] = useState('');
    const { apiFetch } = useOutletContext();
    const navigate = useNavigate();

    async function handleSubmit(e,apiFetch){
        e.preventDefault(); //prevent page refresh
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const result = await upsertPost(apiFetch,formJson);

        if(!result.ok){
            setError("Something went wrong. Could not create Post.")
        }

        navigate('/');
    }
    return (
        <>
        {postDetails
            ? <h2>Editing your post</h2>
            : <h2>Creating your new post</h2>
        }
        {error && <h3>{error}</h3>}
        <form onSubmit={(e)=>handleSubmit(e,apiFetch)} >
            <input hidden id="id" name="id" value={postDetails?.id} />
            <p><label htmlFor="title">Title</label><input id="title" name="title" type="text" value={postDetails?.title} /></p>
            <p><label htmlFor="content">Content</label><textarea id="content" name="content" rows="5" cols="50">{postDetails?.content}</textarea></p>
            <p><label htmlFor="published">Publish</label><input type="checkbox" id="publish" name="publish" value="yes"/></p>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}