import api from "../../api/requests";

function Home(user, posts){
    return (
    <main >
      <div >
        <h3>
          Welcome to your blog!
        </h3>
        <p>{api.testFunc()}</p>
      </div>
      {/*posts.map(p => 
        <p>{p.title}</p>
      )*/}
    </main>
    )
}

export default Home;