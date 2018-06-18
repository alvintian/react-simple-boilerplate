import React, {
	Component
} from 'react';
import MessageList from "./MessageList.jsx";
import Message from "./Message.jsx";
class ChatBar extends Component {
	 constructor(props) {
    super(props);
    this.state = {username: 'Bob',
  								content: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleChange(event) {
    this.setState({content: event.target.value});
  }
  handleNameChange(event) {
    this.setState({username: event.target.value});
  }
  handleEnterPressed = event => {
    event.preventDefault();
    if (event.key === "Enter") {
  	this.props.onMessageSubmit(this.state);
  	this.state.content="";
    }
  }
//defaultValue={this.props.user}
	render() {
	return (<footer className="chatbar">
  <input className="chatbar-username"  onChange={this.handleNameChange} value={this.state.username} placeholder="Your Name (Optional)" />
  <input className="chatbar-message" value={this.state.content} onChange={this.handleChange} 
  onKeyUp={this.handleEnterPressed} placeholder="Type a message and hit ENTER"/>
</footer>)
	}
}

// export const addTask = taskName => {
//   const newTask = {
//     taskName,
//     finished: false,
//     id: generateRandomId()
//   };
//   tasks.push(newTask);
//   return delayResolve({ ...newTask });
// };
export default ChatBar;