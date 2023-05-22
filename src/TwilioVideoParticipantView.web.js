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
  componentDidMount() {
    const remoteView = document.getElementById(`videoremoteview-${this.props.trackIdentifier.participantSid}`)
    remoteView.append(this.props.track.attach())
  }
  render() {
    const scalesType = this.props.scaleType === "fit" ? 1 : 2;
    return (
      // <RCTTWRemoteVideoView scalesType={scalesType} {...this.props}>
      //   {this.props.children}
      // </RCTTWRemoteVideoView>
      <View nativeID={`videoremoteview-${this.props.trackIdentifier.participantSid}`} scalesType={scalesType} {...this.props}>
        {this.props.children}
      </View>
    );
  }
}

module.exports = TwilioVideoParticipantView;
