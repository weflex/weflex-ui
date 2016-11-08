'use strict';

import React from 'react';
import UIFramework from '../framework';

var Select = UIFramework.Component(class extends UIFramework.Control {
  static label = 'select';
  static flexbox = true;
  static propTypes = {
    options: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    options: [
      {text: '未选择', value: undefined}
    ],
  };
  static styles = {
    container: {
      display: 'inline-block',
      margin: 0,
      position: 'relative',
      verticalAlign: 'middle',
      color: '#666',
    },
  };
  get defaultValue() {
    let val;
    try {
      val = this.props.options[0].value;
    } catch (error) {
      return null;
    } finally {
      return val;
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const prevOptions = JSON.stringify(prevProps.options);
    const currOptions = JSON.stringify(this.props.options);
    if (prevOptions !== currOptions && !this.props.value) {
      const options = this.props.options[0];
      this.onInputChange({
        target: {
          value: options.value || options.text
        }
      });
    }
  }
  render() {
    const newProps = this.createProps();
    return (
      <select {...newProps}>
        {(this.props.options).map((item, index) => {
          const optionProps = {value: item.value};
          if (true === item.disabled) {
            optionProps.disabled = true;
          }
          return <option key={index} {...optionProps}>{item.text}</option>;
        })}
      </select>
    );
  }
})

export default Select;
