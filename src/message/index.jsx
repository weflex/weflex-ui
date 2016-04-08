import React from 'react';
import Notification from 'rc-notification';
import UIFramework from '../framework';
import Icon from '../icon';

let defaultDuration = 1.5;
let defaultTop;
let messageInstance;
let key = 1;

let notice = UIFramework.Component((options, config) => {
  messageInstance = messageInstance || Notification.newInstance({
    prefixCls: `${config.prefix}-message`,
    transitionName: 'move-up',
    style: { defaultTop },
  });
  const iconClass = ({
    info: `${config.prefix}-message-info`,
    success: `${config.prefix}-message-success`,
    error: `${config.prefix}-message-error`,
    warn: `${config.prefix}-message-warn`,
    loading: `${config.prefix}-message-loading`
  })[options.type];
  const iconType = ({
    info: 'info-circled',
    success: 'fa-check-circle',
    error: 'cancel-circled',
    warn: 'cancel-circled',
    loading: 'loading'
  })[options.type];

  messageInstance.notice({
    key,
    duration: options.duration || defaultDuration,
    style: {},
    content: (
      <div className={`${config.prefix}-message-custom-content ${iconClass}`}>
        <Icon className={iconClass} type={iconType} />
        <span>{options.content}</span>
      </div>
    ),
    onClose: options.onClose,
  });
  return (function () {
    let target = key++;
    return function () {
      messageInstance.removeNotice(target);
    };
  }());
}, true);

export default {
  info: (content, duration, onClose) => notice({
    type: 'info',
    content,
    duration,
    onClose,
  }),
  success: (content, duration, onClose) => notice({
    type: 'success',
    content,
    duration,
    onClose,
  }),
  error: (content, duration, onClose) => notice({
    type: 'error',
    content,
    duration,
    onClose,
  }),
  warn: (content, duration, onClose) => notice({
    type: 'warn',
    content,
    duration,
    onClose,
  }),
  loading: (content, duration, onClose) => notice({
    type: 'loading',
    content,
    duration,
    onClose,
  }),
  config: (options) => {
    if ('top' in options) {
      defaultTop = options.top;
    }
    if ('duration' in options) {
      defaultDuration = options.duration;
    }
  },
  destroy: () => {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
};
