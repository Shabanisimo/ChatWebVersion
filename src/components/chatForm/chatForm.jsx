import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToolbarButton from '../ToolbarButton';
import Compose from '../compose/compose';

class ChatForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageText: '',
    };

    this.onChangeMessageText = this.onChangeMessageText.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  onChangeMessageText(e) {
    this.setState({
      messageText: e.target.value,
    });
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const {
      activeRoom: { id },
    } = this.props;
    if (nextProps.activeRoom.id !== id) {
      this.setState({
        messageText: '',
      });
    }
    return true;
  }

  onSend(e) {
    e.preventDefault();
    this.props.onSendMessage(this.state.messageText);
    this.setState({
      messageText: '',
    });
  }

  render() {
    return (
      <div>
        <Compose
          onChange={this.onChangeMessageText}
          onSend={this.onSend}
          value={this.state.messageText}
        />
      </div>
    );
  }
}

export default connect(
  messageList => ({
    messageList: messageList,
  }),
  null
)(ChatForm);
