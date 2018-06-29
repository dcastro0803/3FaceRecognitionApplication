/*

Object.assign() to change one element of object not all
*/


import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
import Particles from 'react-particles-js';


// Parameters for Background
const particlesOptions = {
  particles: {
    number: {
      value: 83,
      density: {
        enable: true,
        value_area: 800
      }
    },
    line_linked: {
      enable: false
    },
    size: {
      value: 12,
      random: true
    }
  }
}

const initialState = {
      input: '',
      imageUrl:'',
      box: {},
      route: 'signIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0, 
        joined: ''
      }
    }

class App extends Component {
  // SECTION  WITH functions Input Change
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box: {},
      route: 'signIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0, 
        joined: ''
      }
    }
  }
  // pass function 
  loadUser = (data) => {
    this.setState({ user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries, 
        joined: data.joined
      }
    })
  } 

  // CONNECT SERVER
  /*
  componentDidMount() {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(console.log)
  }
  */ 

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width= Number(image.width);
    const height= Number(image.height);
    console.log(width, height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
    console.log(box); 
  }
  // remember event.target.value to get value 
  onInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log(event.target.value);
  }
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    //app.models.predict( "a403429f2ddf4b49b307e318f00e528b",this.state.input)
    fetch('https://whispering-gorge-80564.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response){
        fetch('https://whispering-gorge-80564.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => { // change just 1 element of object 
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(err => console.log(err));
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }
  // change route with Argument desired
  onRouteChange = (route) => {
    if(route === 'signOut'){
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
    console.log(this.state.isSignedIn);
  }

  // APP Components
  render() {
    //Avoid this.state in all this variables 
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
      <Particles className='particles'
        params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === "home"
        ?<div>
            <Logo  />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
        : (
          route === "signIn"
          ?
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :
          <Register 
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}/>
        ) 
      }
      </div>
    );
  }
}

export default App;
