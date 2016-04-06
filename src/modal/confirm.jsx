'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from './modal';
import Icon from '../icon';
import Button from '../button';
import UIFramework from '../framework';

const defaultLocale = {
  okText: '确定',
  cancelText: '取消',
  justOkText: '知道了',
};

let runtimeLocale = { ...defaultLocale };

export function changeConfirmLocale(newLocale) {
  if (newLocale) {
    runtimeLocale = { ...runtimeLocale, ...newLocale };
  } else {
    runtimeLocale = { ...defaultLocale };
  }
}

function confirm(options, config) {
  const props = { ...options };
  const prefixCls = `${config.prefix}-modal`;
  let div = document.createElement('div');
  document.body.appendChild(div);

  let d;
  props.iconClassName = props.iconClassName || 'help-circled';

  let iconClassType = props.iconClassName;

  let width = props.width || 416;

  // 默认为 true，保持向下兼容
  if (!('okCancel' in props)) {
    props.okCancel = true;
  }

  props.okText = props.okText ||
    (props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText);
  props.cancelText = props.cancelText || runtimeLocale.cancelText;

  function close() {
    d.setState({
      visible: false,
    });
    ReactDOM.unmountComponentAtNode(div);
    div.parentNode.removeChild(div);
  }

  function onCancel() {
    console.log('cancel');
    let cancelFn = props.onCancel;
    if (cancelFn) {
      let ret;
      if (cancelFn.length) {
        ret = cancelFn(close);
      } else {
        ret = cancelFn();
        if (!ret) {
          close();
        }
      }
      if (ret && ret.then) {
        ret.then(close);
      }
    } else {
      close();
    }
  }

  function onOk() {
    let okFn = props.onOk;
    if (okFn) {
      let ret;
      if (okFn.length) {
        ret = okFn(close);
      } else {
        ret = okFn();
        if (!ret) {
          close();
        }
      }
      if (ret && ret.then) {
        ret.then(close);
      }
    } else {
      close();
    }
  }

  let body = (
    <div className={`${prefixCls}-body`}>
      <Icon type={iconClassType} />
      <span className={`${prefixCls}-title`}>{props.title}</span>
      <div className={`${prefixCls}-content`}>{props.content}</div>
    </div>
  );

  let footer = null;
  if (props.okCancel) {
    footer = (
      <div className={`${prefixCls}-btns`}>
        <Button onClick={onCancel}>
          {props.cancelText}
        </Button>
        <Button level="primary" onClick={onOk}>
          {props.okText}
        </Button>
      </div>
    );
  } else {
    footer = (
      <div className={`${prefixCls}-btns`}>
        <Button level="primary" onClick={onOk}>
          {props.okText}
        </Button>
      </div>
    );
  }

  ReactDOM.render(<Dialog
    prefixCls={prefixCls}
    postfixCls="confirm"
    visible
    closable={false}
    title=""
    transitionName="zoom"
    footer=""
    maskTransitionName="fade" width={width}>
    <div style={{ zoom: 1, overflow: 'hidden' }}>{body} {footer}</div>
  </Dialog>, div, function () {
    d = this;
  });
}

export default UIFramework.Component(confirm, true);
