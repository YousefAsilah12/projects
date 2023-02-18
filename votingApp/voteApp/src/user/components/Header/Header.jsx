






import "./Header.css"
export const Header = (props) => {
  function logoutHandler(){
    props.onLogout(true)
  }
  return (
    <nav className="nav-style" style={{backgroundColor:props.nav.backgroundColor,color:props.nav.color}}> 
      <h3>Welcome Mr: {props.user.name}</h3>
      <h1>{props.nav.title}</h1>
      <div><button onClick={logoutHandler}>Logout</button></div>
    </nav>
  );
}