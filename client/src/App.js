import React, { Component } from 'react';
//import { ReactDOM } from 'react-dom';
import axios from 'axios';
import CalApp from './CalApp'
//import events from "./events";

  const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends Component {
  // initialize our state
  state = {
    events:[],
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 100000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  //testJson =  {id: "1", message: "test"};
 
  
  /*getDataFromDb = () => {
    ///var testJson =  {id: "1", message: "test"};
    fetch('/api/getData')
      .then((data) => data)
      .then((res) => this.setState({ data: res.data }));
      //.then((res) => this.setState({ data: testJson }));
  };*/
  
  /*getDataFromDb = () => {
    axios.get('https://c86e0d6a46c3464b84e816edd7272c89.vfs.cloud9.us-east-1.amazonaws.com:8080/api/getData',{
  method: 'GET',
  mode: 'no-cors',
  headers: {
    'Access-Control-Allow-Origin': 'https://c86e0d6a46c3464b84e816edd7272c89.vfs.cloud9.us-east-1.amazonaws.com:8081',
    'Access-Control-Request-Headers' : 'Authorization, Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,OPTIONS'
  }
})
.then(results => console.log(results))
  };*/
  
  /*getDataFromDb = () => {
  axios.get('/api/getData'
  )
  
  .then(function (response) {
    console.log(response);
    
  })
  .catch(function (error) {
    console.log(error);
  });
  }*/
  getDataFromDb = () => {
  axios.get('/api/getData').then(response => response.data)
    .then((data) => {
      this.setState({ data: data.data })
      console.log(this.state.data)
     }
     )};
  
 
  
  
  /*getDataFromDb = () => {
    fetch('https://c86e0d6a46c3464b84e816edd7272c89.vfs.cloud9.us-east-1.amazonaws.com:8080/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));

      /*let testJson = [];
      testJson = {"data" : [{"id": "1", "message": "test"}, {"id": "2", "message": "test2"}]};
      console.log(testJson.data);
      this.setState({ data: testJson.data });
      //this.setState({data: testJson.data, id : 1},function(){
      // console.log(this.state.data);
      //})
  };*/

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message) => {
    console.log('putting');
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('/api/putData', {
      id: idToBeAdded,
      message: message,
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    var I_idTodelete = parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((data) => {
      if (data.id === I_idTodelete) {
        objIdToDelete = data._id;
      }
    });

    axios.delete('/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    var I_idToUpdate = parseInt(idToUpdate);
    console.log('idToUpdate:' + idToUpdate);
    console.log('updateToApply:' + updateToApply);
    this.state.data.forEach((data) => {
      if (data.id === I_idToUpdate) {
        objIdToUpdate = data._id;
      }
    });

    axios.post('/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  

  render() {
    console.log('I was triggered during render');
    const { data } = this.state;
    return (
      <div style = {styles}>
      <CalApp/>
        <ul>
          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((data) => (
                <li style={{ padding: '10px' }} key={data.message}>
                  <span style={{ color: 'gray' }}> id: </span> {data.id} <br />
                  <span style={{ color: 'gray' }}> data: </span>
                  {data.message}
                </li>
              ))}
        </ul>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: '200px' }}
          />
          <button onClick={() => this.putDataToDB(this.state.message)}>
            ADD
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
  
  
  /*render() {
    console.log('I was triggered during render');
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((data) => (
                <li style={{ padding: '10px' }} key={data.message}>
                  <span style={{ color: 'gray' }}> id: </span> {data.id} <br />
                  <span style={{ color: 'gray' }}> data: </span>
                  {data.message}
                </li>
              ))}
        </ul>
        </div>
    );
  }*/
}

//render(<App />, document.getElementById("root"));
export default App;
