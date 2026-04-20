//const posts = await("api/posts");

async function getPosts(apiFetch){
    return apiFetch("/api/posts");
}

async function postLogin(formJson){
    const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formJson),
    });

    if (!res.ok) throw new Error(res.message || "Login failed");

    return res.json();
}

async function upsertPost(apiFetch, formJson){
    return apiFetch("/api/post", {
        method: "POST",
        body: JSON.stringify(formJson)
    });
}

async function deletePost(apiFetch, id){
    return apiFetch(`/api/post/${id}`, {
        method: "DELETE"
    });
}

async function deleteComment(apiFetch, id){
    return apiFetch(`/api/comment/${id}`, {
        method: "DELETE"
    });
}


export {
    getPosts,
    postLogin,
    upsertPost,
    deletePost,
    deleteComment
};