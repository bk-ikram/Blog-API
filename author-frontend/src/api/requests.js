//const posts = await("api/posts");

export default async function getPosts(){
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
