//
//  TwilioVideoLocalView.js
//  Black
//
//  Created by Martín Fernández on 6/13/17.
//
//

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

class TwilioVideoLocalView extends Component {
  static propTypes = {
    /**
     * Indicate if video feed is enabled.
     */
    enabled: PropTypes.bool.isRequired,
    /**
     * How the video stream should be scaled to fit its
     * container.
     */
    scaleType: PropTypes.oneOf(["fit", "fill"]),
  };
  constructor(props) {
    super(props)
    this.container = React.createRef();
  }
  componentDidMount() {
    window.addEventListener('roomDidConnect', (event) => {
      const {
        room
      } = event.detail
      room.localParticipant.tracks.forEach((publicationTrack) => {
        const html = publicationTrack.track.attach()
        this.container.current.append(html)
        const video = Array.from(this.container.current.getElementsByTagName('video'))
        video.forEach((video) => {
          video.style.objectFit = this.props.scaleType === "fit" ? 'fill' : 'cover'
          video.style.width = '100%'
          video.style.height = '100%'
        })
      })
    })
  }
  render() {
    const scalesType = this.props.scaleType === "fit" ? 1 : 2;
    return (
      // <RCTTWLocalVideoView scalesType={scalesType} {...this.props}>
      //   {this.props.children}
      // </RCTTWLocalVideoView>
      <View ref={this.container} scalesType={scalesType} {...this.props}>
        {this.props.children}
      </View>
    );
  }
}

module.exports = TwilioVideoLocalView;
