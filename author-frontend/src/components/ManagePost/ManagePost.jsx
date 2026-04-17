import { useOutletContext } from "react-router-dom";
import { upsertPost } from "../../api/requests";

async function handleSubmit(e,apiFetch){
    e.preventDefault(); //prevent page refresh
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    return await upsertPost(apiFetch,formJson);

}

export default function ManagePost(postDetails){
    const { apiFetch } = useOutletContext();
    return (
        <>
        {postDetails
            ? <h2>Editing your post</h2>
            : <h2>Creating your new post</h2>
        }
        <form onSubmit={(e)=>handleSubmit(e,apiFetch)} >
            <input hidden id="id" name="id" value={postDetails?.id} />
            <p><label htmlFor="title">Title</label><input id="title" name="title" type="text" value={postDetails?.title} /></p>
            <p><label htmlFor="content">Content</label><textarea id="content" name="content" rows="5" cols="50">{postDetails?.content}</textarea></p>
            <p><label htmlFor="published">Publish</label><input type="radio" id="publish" name="publish" value="yes"/></p>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}