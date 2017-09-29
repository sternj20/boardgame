import React, { Component } from "react";
import "./Gamelist.css";
import Axios from "axios";
import ListItem from "../ListItem"
// import {firebase} from "firebase";
import {Modal, Button, Collapsible} from "react-materialize";

class Gamelist extends Component {
  state = {
    myGames: [],
  }

  // For loading a users list of games when the Dashboard >>> Gamelist is rendered.
  componentDidMount() {
    let myId = localStorage.getItem("myId");
    console.log("Searching for user games");
    Axios.get("/api/games/" + myId + "/mylist")
      .then(response => {
        console.log(response.data.mygameslist);
        this.setState({myGames : response.data.mygameslist});
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleNewGameSubmit = () => {
    console.log("trying to submit new game");
    const gameName = document.getElementById("newGame").value;
    const userId = localStorage.getItem("myId");
    const postRoute = "/api/newgame/" + gameName + "/" + userId;
    console.log(postRoute);
    Axios.post(postRoute, {
      title: gameName,
      users: userId,
    })
    .then((response) => {
      console.log(">>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<")
      console.log(response);
      this.setState({
        myGames: [...this.state.myGames, gameName]
      });
    })
    .catch((error) => { console.log(error) })
  }

  render () {
    return (
      <div className="col s9 center card-panel">
        <h2>Gamelist</h2>
        <Collapsible accordion>
          {this.state.myGames.map((gameName, i) => {
              console.log("making a list item");
              return <ListItem
                      game={gameName}
                      key={i}
                      iteration={i}
                    />
            })
          }
        </Collapsible>
        <Modal
          header="Add a game to your collection:"
          id="new-game-modal"
          trigger={<Button floating large className='red' id="add-games-btn" waves='light' icon='add' />}>
          <input
            placeholder="Game Name"
            id="newGame"/>
          <br/>
          <Button
            waves='light'
            modal='close'
            onClick={this.handleNewGameSubmit}>
              Submit
          </Button>
        </Modal>
      </div>

    )
  }
}

export default Gamelist;
