import { useNavigate, useOutletContext, useParams, useLocation } from "react-router-dom";
import { upsertPost } from "../../api/requests";
import { useState, useEffect } from "react";



export default function ManagePost(){
    const [error, setError] = useState('');
    const { apiFetch } = useOutletContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const { state } = useLocation();

    const postDetails = state?.post;
    const isPublished = state?.post?.published;


    async function handleSubmit(e){
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
            <input hidden id="id" name="id" defaultValue={postDetails?.id} />
            <p><label htmlFor="title">Title</label><input id="title" name="title" type="text" defaultValue={postDetails?.title} /></p>
            <p><label htmlFor="content">Content</label><textarea id="content" name="content" rows="5" cols="50" defaultValue = {postDetails?.content}/></p>
            <p><label htmlFor="publish">Publish</label><input type="checkbox" id="publish" name="publish" defaultChecked={isPublished} /></p>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}