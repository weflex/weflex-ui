"use strict";

/**
 * @module react-profile
 */

import React from 'react';
import UIFramework from '../framework';
const DEFAULT_AVATAR = 'http://static.theweflex.com/default-avatar-male.png';

/**
 * @class Image
 */
export default UIFramework.Component(
  class extends React.Component {
    static label = 'image';
    static propTypes = {
      /**
       * @property {weflex.ExternalResource} src - the src with uri
       */
      src: React.PropTypes.object,
      /**
       * @property {Number} size - the size
       */
      size: React.PropTypes.number,
      circle: React.PropTypes.bool,
    };
    static defaultProps = {
      src: {
        uri: DEFAULT_AVATAR,
      },
      size: 40,
      className: '',
    };
    render() {
      let uri;
      if (!this.props.src || !this.props.src.uri) {
        uri = DEFAULT_AVATAR;
      } else {
        uri = this.props.src.uri;
      }
      const imgStyl = {
        width: this.props.size,
        height: this.props.size,
        borderRadius: this.props.config['border-radius-base'],
      };
      if (this.props.circle) {
        imgStyl.borderRadius = this.props.size / 2;
      }
      return (
        <img 
          className={this.props.className}
          style={imgStyl} 
          src={uri} 
        />
      );
    }
  }
)
