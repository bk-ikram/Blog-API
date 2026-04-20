//const posts = await("api/posts");

async function getPosts(apiFetch){
    return apiFetch("/api/posts");
}



async function postComment(apiFetch, formJson){
    const { id } = formJson
    return apiFetch(`/api/post/${id}/comment`, {
        method: "POST",
        body: JSON.stringify(formJson)
    });
}




export {
    getPosts,
    postComment
};