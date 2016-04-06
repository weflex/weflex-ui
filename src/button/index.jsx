'use strict';

import React from 'react';
import UIFramework from '../framework';

/**
 * @class Button
 */
export default UIFramework.Component(class extends React.Component {
  static label    = 'button';
  static flexbox  = true;
  static propTypes = {
    text: React.PropTypes.string,
    level: React.PropTypes.oneOf([
      'primary', 'warning', 'error', 'success'
    ]),
    full: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    interval: React.PropTypes.number,
    intervalFormat: React.PropTypes.func,
  };
  static defaultProps = {
    full: false,
    disabled: false,
    intervalFormat: (count) => `waiting...(${count})`,
  };
  static styles = {
    button: {
      display: 'inline-block',
      height: '30px',
      border: '1px solid #9b9b9b',
      borderRadius: '4px',
      padding: '0 10px',
      color: '#7e7e7e',
      backgroundColor: '#fff',
      cursor: 'pointer',
      transition: 'all .3s ease-in-out',
      boxSizing: 'border-box',
      outline: 'none',
    },
    disabled: {
      borderColor: '#eeeeee',
      color: '#eeeeee',
      cursor: 'no-drop',
    },
    levels: {
      primary: {
        color: '#ffffff',
        borderColor: '#70CCA1',
        backgroundColor: '#70CCA1',
      }
    },
    hovered: {
      color: '#ffffff',
      borderColor: '#70CCA1',
      backgroundColor: '#70CCA1',
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      hovered: false,
      text: props.children || props.text,
    };
  }

  /**
   * @event onMouseOver
   */
  onMouseOver() {
    this.setState({
      hovered: true,
    });
  }

  /**
   * @event onMouseLeave
   */
  onMouseLeave() {
    this.setState({
      hovered: false,
    });
  }

  /**
   * Click this button has different behaviors
   *
   * @event onClick
   */
  async onClick(event) {
    this.setState({
      disabled: true
    });

    let isValid;
    if (typeof this.props.onClick === 'function') {
      isValid = await this.props.onClick(event);
    }
    if ((isValid === undefined || isValid) &&
      this.props.interval !== undefined) {
      let count = this.props.interval;
      let interval = setInterval(() => {
        count -= 1;
        if (count >= 0) {
          this.setState({
            text: this.props.intervalFormat(count),
          });
        } else {
          clearInterval(interval);
          this.setState({
            text: this.props.text,
            disabled: false,
          });
        }
      }, 1000);
    } else {
      this.setState({
        disabled: false,
      });
    }
  }

  render() {
    let disabled;
    if (this.state.disabled === true) {
      disabled = true;
    } else {
      disabled = this.props.disabled;
    }

    let srcProps = {};
    let style = Object.assign({}, this.props.style, this.props.styles.button);
    if (this.props.level) {
      let level = this.props.level;
      if (level && this.props.config.colors[level]) {
        style.backgroundColor = style.borderColor = this.props.config.colors[level];
        style.color = '#fff';
      }
    }

    if (disabled) {
      style = Object.assign(style, this.props.styles.disabled);
    } else {
      if (this.state.hovered) {
        style = Object.assign(style, this.props.styles.hovered);
      }
      srcProps.onMouseOver = this.onMouseOver.bind(this);
      srcProps.onMouseLeave = this.onMouseLeave.bind(this);
      srcProps.onClick = this.onClick.bind(this);
    }
    if (this.props.block) {
      srcProps.flex = 1.0;
    } else if (!this.props.flex) {
      style = Object.assign(style, {
        width: 'auto',
      });
    }

    srcProps.style = style;
    return (
      <button {...srcProps}>
        {this.state.text}
      </button>
    );
  }
})
