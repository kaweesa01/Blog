import React, { Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";

class Alert extends React.Component {
  componentDidUpdate(prevProps) {
    const { alert, show, message } = this.props;
    if(message !== prevProps.message){
      if(message.add) alert.success(`${message.add}`)
      if(message.delete) alert.show(`${message.delete}`)
      if(message.edit) alert.success(`${message.edit}`)
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  message: state.message.message
});

export default connect(mapStateToProps)(withAlert()(Alert));
