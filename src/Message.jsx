import React, {
	Component
} from 'react';
import ReactDOM from "react-dom";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";


class Message extends Component {
  render() {
    const style = { color: this.props.color };
    return <h1 style={style}>{this.props.children}</h1>;
  }
}

export default Message;
