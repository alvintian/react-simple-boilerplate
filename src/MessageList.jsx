import React, {
  Component
} from 'react';
import ReactDOM from "react-dom";
import Message from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";

function ListMessage(props) {
  // Correct! There is no need to specify the key here:
    if(props.value.type==="incomingNotification") {
  return <div className="message system">{props.value.content}</div>
}else{
  return <div className="message"><span className="message-username">{props.value.username}</span>
  <span className="message-content">{props.value.content}</span></div>;
}
}

class MessageList extends Component {
  render() {
  let messages =this.props.message;
return (<main className="messages"> {messages.map(x=><ListMessage value={x} key ={x.id}/>)}
  </main>)
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
export default MessageList;