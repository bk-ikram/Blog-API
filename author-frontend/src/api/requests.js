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

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Login failed");

    return data;
}

export {
    getPosts,
    postLogin
};