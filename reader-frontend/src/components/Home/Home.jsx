import { getPosts }  from "../../api/requests";
import { useState, useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import Post from "../Post/Post";


export function Home(user){
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { apiFetch } = useOutletContext();

  function addComment(postid, comment){
    setPosts( (prev) => prev.map( p => {
      if(p.id !== postid)
        return p;
      else{
        const newComments = [...(p.comments || []), comment];
        return {...p, comments: newComments}
      }
    }))
  }

  useEffect(() => {
    getPosts(apiFetch)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  if(loading)
    return <p>Loading.......</p>;

  return (
    <main >
      <div >
        <h3>
          Welcome to your blog!
        </h3>
      </div>

      {posts && posts.map( p =>
        <Post 
        key = {p.id}
        id= {p.id}
        title = {p.title}
        content = {p.content}
        author = {p.user.userName}
        time = {p.publishedAt || p.createdAt}
        comments = {p.comments}
        published = {p.published}
        addComment = { addComment }
        />
       )}
    </main>
    )
}

