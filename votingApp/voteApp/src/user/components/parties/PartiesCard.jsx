












import "./PartiesCard.css"
import { Alert } from "../alert/alert"
import { useState } from "react";
import { addVote, getAllVotes } from "../../../services/localStore";
export const PartiesCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  function handleYes() {
    addVote(props.data.name)
    const parties=getAllVotes()
    console.log("parties after add",parties);
    setShowModal(false);
    props.onUpdate(true)
    
  }

  function handleNo() {
    setShowModal(false);
    alert("NO");
  }
  const voteClick = (e) => {
    setMessage("Are you sure you want to do this?");
    setShowModal(true);
  }
  return <div className="party-card">
    <h2>{props.data.name}</h2>
    <img src={props.data.logoUrl} alt={props.data.name} />
    <h2>Leader: {props.data.leader}</h2>
    <div>
      <button disabled={props.disableButton} className="vote-btn" onClick={voteClick} >vote for {props.data.name}</button>
      <Alert
        showModal={showModal}
        message={message}
        handleYes={handleYes}
        handleNo={handleNo} />
    </div>
  </div>
}