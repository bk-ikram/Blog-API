import api from "../../api/requests";
import getPosts from "../../api/requests";
import { useLoaderData } from "react-router-dom";

export async function loader({request}){
  const posts = await getPosts();
  return posts;
}


export function Home(user){
  const posts = useLoaderData();
    return (
    <main >
      <div >
        <h3>
          Welcome to your blog!
        </h3>
      </div>
      {posts && posts.map(p => 
        <div key={p.id}>
          <p>{p.title}</p>
          <p>{p.content}</p>
        </div>
        
      )}
    </main>
    )
}

