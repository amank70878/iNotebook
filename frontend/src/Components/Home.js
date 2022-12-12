import Addnotes from "./Addnotes"
import Notes from "./Notes"

export const Home = (props) => {
  return (
    <>

    {localStorage.getItem("token")!==null ? <div><Addnotes showAlert={props.showAlert} />
        <div style={{width: '80vw', margin: 'auto'}}>
        <Notes showAlert={props.showAlert}/>
        </div></div>:<h1 className="container text-center my-5">please logged in with your credentials</h1>}

    </>
  )
}

export default Home