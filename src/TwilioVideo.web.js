//
//  TwilioVideo.js
//  Black
//
//  Created by Martín Fernández on 6/13/17.
//
//

import { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import * as Video from 'twilio-video';

// const { TWVideoModule } = NativeModules;

export default class TwilioVideo extends Component {
  static propTypes = {
    /**
     * Callback that is called when screen share permission received.
     */
    onScreenShareChanged: PropTypes.func,
    /**
     * Called when the room has connected
     *
     * @param {{roomName, participants}}
     */
    onRoomDidConnect: PropTypes.func,
    /**
     * Called when the room has disconnected
     *
     * @param {{roomName, error}}
     */
    onRoomDidDisconnect: PropTypes.func,
    /**
     * Called when connection with room failed
     *
     * @param {{roomName, error}}
     */
    onRoomDidFailToConnect: PropTypes.func,
    /**
     * Called when a new participant has connected
     *
     * @param {{roomName, participant}}
     */
    onRoomParticipantDidConnect: PropTypes.func,
    /**
     * Called when a participant has disconnected
     *
     * @param {{roomName, participant}}
     */
    onRoomParticipantDidDisconnect: PropTypes.func,
    /**
     * Called when a new video track has been added
     *
     * @param {{participant, track, enabled}}
     */
    onParticipantAddedVideoTrack: PropTypes.func,
    /**
     * Called when a video track has been removed
     *
     * @param {{participant, track}}
     */
    onParticipantRemovedVideoTrack: PropTypes.func,
    /**
     * Called when a new data track has been added
     *
     * @param {{participant, track}}
     */
    onParticipantAddedDataTrack: PropTypes.func,
    /**
     * Called when a data track has been removed
     *
     * @param {{participant, track}}
     */
    onParticipantRemovedDataTrack: PropTypes.func,
    /**
     * Called when a new audio track has been added
     *
     * @param {{participant, track}}
     */
    onParticipantAddedAudioTrack: PropTypes.func,
    /**
     * Called when a audio track has been removed
     *
     * @param {{participant, track}}
     */
    onParticipantRemovedAudioTrack: PropTypes.func,
    /**
     * Called when a video track has been enabled.
     *
     * @param {{participant, track}}
     */
    onParticipantEnabledVideoTrack: PropTypes.func,
    /**
     * Called when a video track has been disabled.
     *
     * @param {{participant, track}}
     */
    onParticipantDisabledVideoTrack: PropTypes.func,
    /**
     * Called when an audio track has been enabled.
     *
     * @param {{participant, track}}
     */
    onParticipantEnabledAudioTrack: PropTypes.func,
    /**
     * Called when an audio track has been disabled.
     *
     * @param {{participant, track}}
     */
    onParticipantDisabledAudioTrack: PropTypes.func,
    /**
     * Called when an dataTrack receives a message
     *
     * @param {{message}}
     */
    onDataTrackMessageReceived: PropTypes.func,
    /**
     * Called when the camera has started
     *
     */
    onCameraDidStart: PropTypes.func,
    /**
     * Called when the camera has been interrupted
     *
     */
    onCameraWasInterrupted: PropTypes.func,
    /**
     * Called when the camera interruption has ended
     *
     */
    onCameraInterruptionEnded: PropTypes.func,
    /**
     * Called when the camera has stopped runing with an error
     *
     * @param {{error}} The error message description
     */
    onCameraDidStopRunning: PropTypes.func,
    /**
     * Called when stats are received (after calling getStats)
     *
     */
    onStatsReceived: PropTypes.func,
    /**
     * Called when the network quality levels of a participant have changed (only if enableNetworkQualityReporting is set to True when connecting)
     *
     */
    onNetworkQualityLevelsChanged: PropTypes.func,
    /**
     * Called when dominant speaker changes
     * @param {{ participant, room }} dominant participant
     */
    onDominantSpeakerDidChange: PropTypes.func,
    /**
     * Whether or not video should be automatically initialized upon mounting
     * of this component. Defaults to true. If set to false, any use of the
     * camera will require calling `_startLocalVideo`.
     */
    autoInitializeCamera: PropTypes.bool,
    ...View.propTypes,
  };
  static defaultProps = {
    onScreenShareChanged: () => {},
    /**
     * Called when the room has connected
     *
     * @param {{roomName, participants}}
     */
    onRoomDidConnect: () => {},
    /**
     * Called when the room has disconnected
     *
     * @param {{roomName, error}}
     */
    onRoomDidDisconnect: () => {},
    /**
     * Called when connection with room failed
     *
     * @param {{roomName, error}}
     */
    onRoomDidFailToConnect: () => {},
    /**
     * Called when a new participant has connected
     *
     * @param {{roomName, participant}}
     */
    onRoomParticipantDidConnect: () => {},
    /**
     * Called when a participant has disconnected
     *
     * @param {{roomName, participant}}
     */
    onRoomParticipantDidDisconnect: () => {},
    /**
     * Called when a new video track has been added
     *
     * @param {{participant, track, enabled}}
     */
    onParticipantAddedVideoTrack: () => {},
    /**
     * Called when a video track has been removed
     *
     * @param {{participant, track}}
     */
    onParticipantRemovedVideoTrack: () => {},
    /**
     * Called when a new data track has been added
     *
     * @param {{participant, track}}
     */
    onParticipantAddedDataTrack: () => {},
    /**
     * Called when a data track has been removed
     *
     * @param {{participant, track}}
     */
    onParticipantRemovedDataTrack: () => {},
    /**
     * Called when a new audio track has been added
     *
     * @param {{participant, track}}
     */
    onParticipantAddedAudioTrack: () => {},
    /**
     * Called when a audio track has been removed
     *
     * @param {{participant, track}}
     */
    onParticipantRemovedAudioTrack: () => {},
    /**
     * Called when a video track has been enabled.
     *
     * @param {{participant, track}}
     */
    onParticipantEnabledVideoTrack: () => {},
    /**
     * Called when a video track has been disabled.
     *
     * @param {{participant, track}}
     */
    onParticipantDisabledVideoTrack: () => {},
    /**
     * Called when an audio track has been enabled.
     *
     * @param {{participant, track}}
     */
    onParticipantEnabledAudioTrack: () => {},
    /**
     * Called when an audio track has been disabled.
     *
     * @param {{participant, track}}
     */
    onParticipantDisabledAudioTrack: () => {},
    /**
     * Called when an dataTrack receives a message
     *
     * @param {{message}}
     */
    onDataTrackMessageReceived: () => {},
    /**
     * Called when the camera has started
     *
     */
    onCameraDidStart: () => {},
    /**
     * Called when the camera has been interrupted
     *
     */
    onCameraWasInterrupted: () => {},
    /**
     * Called when the camera interruption has ended
     *
     */
    onCameraInterruptionEnded: () => {},
    /**
     * Called when the camera has stopped runing with an error
     *
     * @param {{error}} The error message description
     */
    onCameraDidStopRunning: () => {},
    /**
     * Called when stats are received (after calling getStats)
     *
     */
    onStatsReceived: () => {},
    /**
     * Called when the network quality levels of a participant have changed (only if enableNetworkQualityReporting is set to True when connecting)
     *
     */
    onNetworkQualityLevelsChanged: () => {},
    /**
     * Called when dominant speaker changes
     * @param {{ participant, room }} dominant participant
     */
    onDominantSpeakerDidChange: () => {},
  }
  state = {
    track: null,
    videoTrack: null,
    audioTrack: null,
    screenTrack: null,
    dataTrack: null
  }
  constructor(props) {
    super(props);

    this._subscriptions = [];
  }

  componentDidMount() {
    this._registerEvents();
    if (this.props.autoInitializeCamera !== false) {
      this._startLocalVideo();
    }
    this._startLocalAudio();
  }

  componentWillUnmount() {
    this._unregisterEvents();
    this._stopLocalVideo();
    this._stopLocalAudio();
    this.disconnect()
  }

  /**
   * Locally mute/ unmute all remote audio tracks from a given participant
   */
  setRemoteAudioPlayback({ participantSid, enabled }) {
    // TWVideoModule.setRemoteAudioPlayback(participantSid, enabled);
  }

  setRemoteAudioEnabled(enabled) {
    return Promise.resolve(enabled);
  }

  setBluetoothHeadsetConnected(enabled) {
    return Promise.resolve(enabled);
  }

  /**
   * Enable or disable local video
   */
  setLocalVideoEnabled(enabled) {
    // return TWVideoModule.setLocalVideoEnabled(enabled);
    if (enabled) {
      this.state.videoTrack && this.state.videoTrack.enable()
    } else {
      this.state.videoTrack && this.state.videoTrack.disable()
    }
    return Promise.resolve(enabled)
  }

  /**
   * Enable or disable local audio
   */
  setLocalAudioEnabled(enabled) {
    if (enabled) {
      this.state.audioTrack && this.state.audioTrack.enable()
    } else {
      this.state.audioTrack && this.state.audioTrack.disable()
    }
    return Promise.resolve(enabled)
    // return TWVideoModule.setLocalAudioEnabled(enabled);
  }

  /**
   * Filp between the front and back camera
   */
  flipCamera() {
    // TWVideoModule.flipCamera();
  }
  /**
   * Toggle screen sharing
   */
  setScreenShareEnabled = async (enabled) => {
    // TWVideoModule.toggleScreenShare(enabled)
    const room = this.state.room
    if (enabled) {
      navigator.mediaDevices.getDisplayMedia().then(async stream => {
        const screenTrack = new Video.LocalVideoTrack(stream.getTracks()[0]);
        screenTrack.mediaStreamTrack.onended = () => { 
          this.setScreenShareEnabled(false)
        };
        room.localParticipant.publishTrack(screenTrack);
        await new Promise((resolve) => {
          this.setState({
            screenTrack
          }, resolve)
        })
        this.props.onScreenShareChanged({
          screenShareEnabled: enabled
        })
      }).catch((e) => {
        console.log(e)
        alert('Could not share the screen.')
      });
    } else { // disable screen share
      const screenTrack = this.state.screenTrack
      room.localParticipant.unpublishTrack(screenTrack);
      screenTrack.stop();
      await new Promise((resolve) => {
        this.setState({
          screenTrack: null
        }, resolve)
      })
      this.props.onScreenShareChanged({
        screenShareEnabled: enabled
      })
    }
  }

  /**
   * Toggle screen sharing
   */
  toggleScreenSharing(status) {
    // TWVideoModule.toggleScreenSharing(status);
  }

  /**
   * Toggle audio setup from speaker (default) and headset
   */
  toggleSoundSetup(speaker) {
    // TWVideoModule.toggleSoundSetup(speaker);
  }

  /**
   * Get connection stats
   */
  getStats() {
    // TWVideoModule.getStats();
  }
  roomDidConnect = async () => {
    const room = this.state.room
    const event = new CustomEvent("roomDidConnect", { detail: {
      room
    } });
    window._room = room
    window.dispatchEvent(event)
    this.props.onRoomDidConnect({
      roomName: room.name,
      localParticipant: room.localParticipant,
      participants: room.participants
    });

    // subscribe room
    room.participants.forEach(participant => this.participantConnected(participant));
    room.on('participantConnected', participant => this.participantConnected(participant));

    room.on('participantDisconnected', participant => this.participantDisconnected(participant));
    room.once('disconnected', error => room.participants.forEach(participant => this.participantDisconnected(participant)));
  }
  participantConnected = (participant) => {
    console.log('participant connected', participant, this)
    this.props.onRoomParticipantDidConnect(participant)
    participant.on('trackSubscribed', track => this.trackSubscribed(participant, track));
    participant.on('trackUnsubscribed', track => this.trackUnsubscribed(participant, track));

    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        this.trackSubscribed(participant, track);
      }
    });
  }
  participantDisconnected = (participant) => {
    this.props.onRoomParticipantDidDisconnect(participant)
  }
  /**
   * 
   * @param {Video.RemoteParticipant} participant 
   * @param {*} track 
   */
  trackSubscribed = (participant, track) => {
    const eventObj = {
      participant,
      track: {
        ...track,
        trackSid: track.sid
      }
    }
    switch(track.kind) {
      case 'data':
        this.props.onParticipantAddedDataTrack(eventObj)
        break;
      case 'audio':
        this.props.onParticipantAddedDataTrack(eventObj)
        break;
      case 'video':
        this.props.onParticipantAddedVideoTrack(eventObj)
        break;
    }
  }
  trackUnsubscribed = (participant, track) => {
    const eventObj = {
      participant,
      track: {
        ...track,
        trackSid: track.sid
      }
    }
    switch(track.kind) {
      case 'data':
        this.props.onParticipantRemovedDataTrack(eventObj)
        break;
      case 'audio':
        this.props.onParticipantRemovedAudioTrack(eventObj)
        break;
      case 'video':
        this.props.onParticipantRemovedVideoTrack(eventObj)
        break;
    }
  }
  /**
   * Connect to given room name using the JWT access token
   * @param  {String} roomName    The connecting room name
   * @param  {String} accessToken The Twilio's JWT access token
   * @param  {String} encodingParameters Control Encoding config
   * @param  {Boolean} enableNetworkQualityReporting Report network quality of participants
   */
  connect = async ({
    roomName,
    accessToken,
    cameraType = "front", // "back"
    enableAudio = true,
    enableVideo = true,
    encodingParameters = null,
    enableNetworkQualityReporting = false,
    dominantSpeakerEnabled = false,
  }) => {
    // TWVideoModule.connect(
    //   accessToken,
    //   roomName,
    //   enableAudio,
    //   enableVideo,
    //   encodingParameters,
    //   enableNetworkQualityReporting,
    //   dominantSpeakerEnabled,
    //   cameraType
    // );
    const facingMode = cameraType === 'front' ? 'user' : 'environment'
    const dataTrack = new Video.LocalDataTrack()
    const videoTrack = await Video.createLocalVideoTrack({
      facingMode
    })
    const audioTrack = await Video.createLocalAudioTrack()
    // const tracks = await Video.createLocalTracks({
    //   video: {
    //     facingMode
    //   },
    //   audio: true,
    // })
    const room = await Video.connect(accessToken, {
      name: roomName,
      audio: false,
      video: false,
      dominantSpeaker: dominantSpeakerEnabled,
      tracks: [videoTrack, audioTrack, dataTrack]
    })
    await new Promise((resolve) => {
      this.setState({
        room,
        audioTrack,
        dataTrack,
        videoTrack
      }, resolve)
    })
    this.roomDidConnect()
    return Promise.resolve(room)
  }

  /**
   * Disconnect from current room
   */
  disconnect() {
    // TWVideoModule.disconnect();
    this.state.room && this.state.room.disconnect()
    this.props.onRoomDidDisconnect({})
  }

  /**
   * Publish a local audio track
   */
  publishLocalAudio() {
    // TWVideoModule.publishLocalAudio();
  }

  /**
   * Publish a local video track
   */
  publishLocalVideo() {
    // TWVideoModule.publishLocalVideo();
  }

  /**
   * Unpublish a local audio track
   */
  unpublishLocalAudio() {
    // TWVideoModule.unpublishLocalAudio();
  }

  /**
   * Unpublish a local video track
   */
  unpublishLocalVideo() {
    // TWVideoModule.unpublishLocalVideo();
  }

  /**
   * SendString to datatrack
   * @param  {String} message    The message string to send
   */
  sendString(message) {
    // TWVideoModule.sendString(message);
  }

  async _startLocalVideo(facingMode = 'user') {
    // TWVideoModule.startLocalVideo();
    // this.state.room && this.state.room.localParticipant.videoTracks.forEach(publicationTrack => {
    //   publicationTrack.track.enable();
    // });
    // const track = await Video.createLocalVideoTrack({
    //   facingMode
    // })
    // this.state.room && this.state.room.localParticipant.publishTrack(track)
    // this.setState({
    //   videoTrack: track
    // })
  }

  _stopLocalVideo() {
    // TWVideoModule.stopLocalVideo();
    // this.state.room && this.state.room.localParticipant.videoTracks.forEach(publicationTrack => {
    //   publicationTrack.track.enable();
    // });
  }

  async _startLocalAudio() {
    // TWVideoModule.startLocalAudio();
    // this.state.room && this.state.room.localParticipant.audioTracks.forEach(publicationTrack => {
    //   publicationTrack.track.enable();
    // });
    // const track = await Video.createLocalAudioTrack()
    // this.state.room && this.state.room.localParticipant.publishTrack(track)
    // this.setState({
    //   audioTrack: track
    // })
  }

  _stopLocalAudio = () => {
    // TWVideoModule.stopLocalAudio();
    // this.state.room && this.state.room.localParticipant.audioTracks.forEach(publicationTrack => {
    //   publicationTrack.track.disable();
    // });
  }

  _unregisterEvents() {
    // TWVideoModule.changeListenerStatus(false);
    this._subscriptions.forEach((e) => e.remove());
    this._subscriptions = [];
  }

  _registerEvents() {
    // TWVideoModule.changeListenerStatus(true);
    this._subscriptions = [
      // this._eventEmitter.addListener("roomDidConnect", (data) => {
      //   if (this.props.onRoomDidConnect) {
      //     this.props.onRoomDidConnect(data);
      //   }
      // }),
      // this._eventEmitter.addListener("roomDidDisconnect", (data) => {
      //   if (this.props.onRoomDidDisconnect) {
      //     this.props.onRoomDidDisconnect(data);
      //   }
      // }),
      // this._eventEmitter.addListener("roomDidFailToConnect", (data) => {
      //   if (this.props.onRoomDidFailToConnect) {
      //     this.props.onRoomDidFailToConnect(data);
      //   }
      // }),
      // this._eventEmitter.addListener("roomParticipantDidConnect", (data) => {
      //   if (this.props.onRoomParticipantDidConnect) {
      //     this.props.onRoomParticipantDidConnect(data);
      //   }
      // }),
      // this._eventEmitter.addListener("roomParticipantDidDisconnect", (data) => {
      //   if (this.props.onRoomParticipantDidDisconnect) {
      //     this.props.onRoomParticipantDidDisconnect(data);
      //   }
      // }),
      // this._eventEmitter.addListener("participantAddedVideoTrack", (data) => {
      //   if (this.props.onParticipantAddedVideoTrack) {
      //     this.props.onParticipantAddedVideoTrack(data);
      //   }
      // }),
      // this._eventEmitter.addListener("participantAddedDataTrack", (data) => {
      //   if (this.props.onParticipantAddedDataTrack) {
      //     this.props.onParticipantAddedDataTrack(data);
      //   }
      // }),
      // this._eventEmitter.addListener("participantRemovedDataTrack", (data) => {
      //   if (this.props.onParticipantRemovedDataTrack) {
      //     this.props.onParticipantRemovedDataTrack(data);
      //   }
      // }),
      // this._eventEmitter.addListener("participantRemovedVideoTrack", (data) => {
      //   if (this.props.onParticipantRemovedVideoTrack) {
      //     this.props.onParticipantRemovedVideoTrack(data);
      //   }
      // }),
      // this._eventEmitter.addListener("participantAddedAudioTrack", (data) => {
      //   if (this.props.onParticipantAddedAudioTrack) {
      //     this.props.onParticipantAddedAudioTrack(data);
      //   }
      // }),
      // this._eventEmitter.addListener("participantRemovedAudioTrack", (data) => {
      //   if (this.props.onParticipantRemovedAudioTrack) {
      //     this.props.onParticipantRemovedAudioTrack(data);
      //   }
      // }),
      // this._eventEmitter.addListener("participantEnabledVideoTrack", (data) => {
      //   if (this.props.onParticipantEnabledVideoTrack) {
      //     this.props.onParticipantEnabledVideoTrack(data);
      //   }
      // }),
      // this._eventEmitter.addListener(
      //   "participantDisabledVideoTrack",
      //   (data) => {
      //     if (this.props.onParticipantDisabledVideoTrack) {
      //       this.props.onParticipantDisabledVideoTrack(data);
      //     }
      //   }
      // ),
      // this._eventEmitter.addListener("participantEnabledAudioTrack", (data) => {
      //   if (this.props.onParticipantEnabledAudioTrack) {
      //     this.props.onParticipantEnabledAudioTrack(data);
      //   }
      // }),
      // this._eventEmitter.addListener(
      //   "participantDisabledAudioTrack",
      //   (data) => {
      //     if (this.props.onParticipantDisabledAudioTrack) {
      //       this.props.onParticipantDisabledAudioTrack(data);
      //     }
      //   }
      // ),
      // this._eventEmitter.addListener("dataTrackMessageReceived", (data) => {
      //   if (this.props.onDataTrackMessageReceived) {
      //     this.props.onDataTrackMessageReceived(data);
      //   }
      // }),
      // this._eventEmitter.addListener("cameraDidStart", (data) => {
      //   if (this.props.onCameraDidStart) {
      //     this.props.onCameraDidStart(data);
      //   }
      // }),
      // this._eventEmitter.addListener("cameraWasInterrupted", (data) => {
      //   if (this.props.onCameraWasInterrupted) {
      //     this.props.onCameraWasInterrupted(data);
      //   }
      // }),
      // this._eventEmitter.addListener("cameraInterruptionEnded", (data) => {
      //   if (this.props.onCameraInterruptionEnded) {
      //     this.props.onCameraInterruptionEnded(data);
      //   }
      // }),
      // this._eventEmitter.addListener("cameraDidStopRunning", (data) => {
      //   if (this.props.onCameraDidStopRunning) {
      //     this.props.onCameraDidStopRunning(data);
      //   }
      // }),
      // this._eventEmitter.addListener("statsReceived", (data) => {
      //   if (this.props.onStatsReceived) {
      //     this.props.onStatsReceived(data);
      //   }
      // }),
      // this._eventEmitter.addListener("networkQualityLevelsChanged", (data) => {
      //   if (this.props.onNetworkQualityLevelsChanged) {
      //     this.props.onNetworkQualityLevelsChanged(data);
      //   }
      // }),
      // this._eventEmitter.addListener("onDominantSpeakerDidChange", (data) => {
      //   if (this.props.onDominantSpeakerDidChange) {
      //     this.props.onDominantSpeakerDidChange(data);
      //   }
      // }),
    ];
  }

  render() {
    return this.props.children || null;
  }
}
