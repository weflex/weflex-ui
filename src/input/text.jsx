'use strict'

import React from 'react';
import UIFramework from '../framework';

export default UIFramework.Component(class extends UIFramework.Control {
  static label    = 'text-input';
  static flexbox  = true;
  static propTypes = {
    /**
     * @property {Boolean} password - if true, this is a password input
     */
    password: React.PropTypes.bool,
    /**
     * @property {Boolean} multiline - if true, this is a textarea
     */
    multiline: React.PropTypes.bool,
  };

  static defaultProps = {
    password: false,
    multiline: false,
  };

  static styles = {
    multiline: {
      minHeight: '150px',
      width: 'calc(100% - 5px)',
    },
  };

  /**
   * Manually focus to the input
   *
   * @method focus
   */
  focus() {
    this.refs.input.focus();
  }

  /** 
   * Manually blur from the current input
   *
   * @method blur
   */
  blur() {
    this.refs.input.blur();
  }

  render() {
    if (this.props.multiline) {
      const newProps = this.createProps({
        style: this.props.styles.multiline,
      });
      return <textarea ref="input" {...newProps} />;
    } else {
      const type = this.props.password ? 'password' : 'text';
      return <input ref="input" {...this.createProps({type})} />;
    }
  }
});
