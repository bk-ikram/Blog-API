//const posts = await("api/posts");

async function getPosts(){
    try{
        const response = await fetch("/api/posts");
        if(!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        console.log(response);
        let data = await response.json();
        console.log(data);
        return data;
    }
    catch(err){
        console.error('Fetch error: ',err.message);
        throw err;
    }
    
}

async function postLogin(formJson){
    try{
        const response = await fetch("/api/signin", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formJson)
        });
        let data = await response.json();
        if(!response.ok)
            //throw new Error(`HTTP error! status: ${response.status}`);
            throw new Error(data.message)
        return data;
    }
    catch(err){
        console.error('LogIn error: ',err.message);
        throw err;
    }
    
}

export {
    getPosts,
    postLogin
};