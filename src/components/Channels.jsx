import React from 'react';
import { Button } from 'react-bootstrap';
import AddChannelModal from './AddChannelModal';
import Channel from './Channel';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    channelsValue: Object.values(state.channels.byId),
    currentChannelId: state.currentChannelId,
  };
  return props;
};
@connect(mapStateToProps)
class Channels extends React.Component {
  // UI state
  state = {
    modalAddChannel: 'close',
  };

  toggleModal = () => {
    const { modalAddChannel } = this.state;
    const modalState = modalAddChannel === 'close' ? 'open' : 'close';
    this.setState({ modalAddChannel: modalState });
  }

  render() {
    const { channelsValue, currentChannelId } = this.props;
    const { modalAddChannel } = this.state;
    return (
      <React.Fragment>
        <AddChannelModal modalState={modalAddChannel} toggleModal={this.toggleModal} />
        <div className="channels-list row">
          <h5 className="col-12">
            <span className="pr-2">Channels</span>
            <Button onClick={this.toggleModal} variant="outline-secondary font-weight-bold shadow" size="sm">+</Button>
          </h5>
          {channelsValue.map(channel => (
            <Channel
              key={channel.id}
              currentlId={currentChannelId}
              channel={channel}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}


export default Channels;
