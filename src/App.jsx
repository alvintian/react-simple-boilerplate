import React, {
	Component
} from 'react';
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import {
	render
} from "react-dom";
class App extends Component {
	constructor(props) {
		super(props);
		// this is the *only* time you should assign directly to state:
		this.state = {
			totalUsers:0,
			currentUser: {
				name: "Bob"
			}, // optional. if currentUser is not defined, it means the user is Anonymous
			messages: []
		};
	}

	// Called after the component was rendered and it was attached to the
	// DOM. This is a good place to make AJAX requests or setTimeout.
	// in App.jsx
	componentDidMount() {

		this.socket = new WebSocket("ws://localhost:3001/");
		// this.socket.onmessage=function(event){
		// 	console.log(JSON.parse(event.data),"test");
		// }
		this.socket.addEventListener("message", event => {
			const responseMessage = JSON.parse(event.data);
		if(typeof(responseMessage)==='number'){
			console.log(responseMessage,"this is a numb");
		return 	this.totalUsers(responseMessage);	
		}
		  switch(responseMessage.type) {
      case "incomingMessage":
        // handle incoming message
      break;
      case "incomingNotification":
	        // handle incoming notification
		 responseMessage.content= this.state.currentUser.name+" has changed their name to "+responseMessage.username;
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + responseMessage.type);
}
			const messages = this.state.messages.concat(responseMessage);
				// this.setState(state => ({
				//   messages: [event.data, ...state.messages]
				// }));
			this.setState({
				currentUser: {name:responseMessage.username},
				messages: messages
			})

		});
		// setTimeout(() => {
		//   const newMessage = {username: "Michelle", content: "Hello there!"};
		//   const messages = this.state.messages.concat(newMessage)
		//   // Update the state of the app component.
		//   // Calling setState will trigger a call to render() in App and all child components.
		//   this.setState({messages: messages})
		// }, 1000);
	}
	totalUsers=x=>{this.setState({totalUsers:x})};
	handleMessageSubmit = content => {
		console.log(content, "on submit sent");
		if(this.state.currentUser.name!==content.username){
		content.type="postNotification";
		}else{
		content.type="postMessage";
		}
//		this.state.currentUser.name=content.username;
		this.socket.send(JSON.stringify(content));
	}
		render() {
		return (
		<div><nav className="navbar"><a href="/" className="navbar-brand">Chatty</a>
		<div className="totalUser">{this.state.totalUsers} Users Online</div></nav>
		<MessageList message={this.state.messages}/>
		<ChatBar user={this.state.currentUser.name} onMessageSubmit={this.handleMessageSubmit}/></div>
		);}
}
export default App;