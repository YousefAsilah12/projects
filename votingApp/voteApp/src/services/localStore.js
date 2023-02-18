import {
  partiesToVoteFor
} from "../data/data";






export const addVote = (partyName) => {
  debugger
  console.log(partyName);
  let res = localStorage.getItem(partyName);
  let vote;
  if (res) {
    vote = Number(res) + 1
  } else {
    vote = 1;
  }
  localStorage.setItem(partyName, vote);
}

export const getVote = (partyName) => {
  const res = localStorage.getItem(partyName);
  if (!res) {
    return 0
  }
  return res
}

export const getAllVotes = () => {
  debugger
  let arrNames = []
  let arrVotes = []
  for (let i = 0; i < partiesToVoteFor.length; i++) {
    const name = partiesToVoteFor[i].name
    const votes = localStorage.getItem(name)
    console.log(`votes for ${name} is :${votes}`);
    if (votes) {
      arrNames.push(name)
      arrVotes.push(votes)
    }
  }

  if(arrNames.length === 0&&arrNames.length === 0){
    const nullArr = {
      labels: [],
      datasets: [{
        label: "votes",
        data: []
      }]
    }
    return nullArr
  }
  const arr = {
    labels: arrNames,
    datasets: [{
      label: "votes",
      data: arrVotes
    }]
  }
  return arr

}