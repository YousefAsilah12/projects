












import { useEffect, useState } from "react";
import { navData, partiesToVoteFor } from "../../data/data";
import { getUser } from "../../services/getUser"
import { Header } from "../components/Header/Header"
import { PieChart } from "../components/dataView/CircleData";
import { PartiesCard } from "../components/parties/PartiesCard";
import "./userPage.css"
import { addVote, getAllVotes } from "../../services/localStore";
import { useNavigate } from 'react-router-dom';

export function UserPage(params) {
   const user = getUser();
   const navBar = navData;
   const data = partiesToVoteFor
   const navigate = useNavigate();
   const [anyButtonClicked, setAnyButtonClicked] = useState(Boolean(localStorage.getItem(user.name)));
   const [userData, setUserData] = useState(getAllVotes(user.name));
   const [logout,setLogut]=useState(false);


   //when logout true then navigate to login page
   useEffect(() => {
      if (logout) {
        navigate("/login");
      }
    }, [logout]);
  
    function logoutHandler() {
      setLogut(true);
    }
  
   function handleUpdate(data) {
      debugger
      if (data === true) {
         setAnyButtonClicked(true); // disable all buttons
         localStorage.setItem(user.name,anyButtonClicked);
         addVote(user.name)
         const newData=getAllVotes();
         console.log("newVotes",newData);
         setUserData(newData)
         alert("You have successfully voted!");
      }
   }
      return <div className="votingPage-container">
         <div>
            <Header onLogout={logoutHandler} user={user} nav={navBar} />
         </div>

         <div className="canvasStyle">
            <PieChart  chartData={userData} />
         </div>


         <div className="parties-row">
            {partiesToVoteFor.map((party, index) => {
               return <PartiesCard  onUpdate={handleUpdate} data={party} key={index} disableButton={anyButtonClicked} />
            })}
         </div>
      </div>
   }