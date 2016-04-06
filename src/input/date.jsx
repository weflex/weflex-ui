"use strict";

import React from 'react';
import UIFramework from '../framework';

/**
 * @class TimeInput
 */
export default UIFramework.Component(
  class extends UIFramework.Control {
    static label    = 'date-input';
    static flexbox  = true;
    render() {
      return <input {...this.createProps({type: 'date'})} />;
    }
  }
)
