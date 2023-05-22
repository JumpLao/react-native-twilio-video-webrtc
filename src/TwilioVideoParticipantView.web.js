//
//  TwilioVideoParticipantView.js
//  Black
//
//  Created by Martín Fernández on 6/13/17.
//
//

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, requireNativeComponent } from "react-native";

class TwilioVideoParticipantView extends Component {
  static propTypes = {
    trackIdentifier: PropTypes.shape({
      /**
       * The participant sid.
       */
      participantSid: PropTypes.string.isRequired,
      /**
       * The participant's video track sid you want to render in the view.
       */
      videoTrackSid: PropTypes.string.isRequired,
    }),
  };
  constructor(props) {
    super(props)
    this.container = React.createRef();
  }
  componentDidMount() {
    const room = window._room
    const {
      participantSid,
      videoTrackSid
    } = this.props.trackIdentifier
    const participant = room.participants.get(participantSid)
    const publicationTrack = participant.tracks.get(videoTrackSid)
    this.container.current.append(publicationTrack.track.attach())
    const video = Array.from(this.container.current.getElementsByTagName('video'))
    video.forEach((video) => {
      video.style.objectFit = this.props.scaleType === "fit" ? 'fill' : 'cover'
      video.style.width = '100%'
      video.style.height = '100%'
    })
  }
  render() {
    const scalesType = this.props.scaleType === "fit" ? 1 : 2;
    return (
      // <RCTTWRemoteVideoView scalesType={scalesType} {...this.props}>
      //   {this.props.children}
      // </RCTTWRemoteVideoView>
      <View ref={this.container} scalesType={scalesType} {...this.props}>
        {this.props.children}
      </View>
    );
  }
}

module.exports = TwilioVideoParticipantView;
