import React, { PropTypes } from 'react';
import Dialog from 'rc-dialog';
import { Dom } from 'rc-util';
import UIFramework from '../framework';
import Button from '../button';

function noop() {}

let mousePosition;
let mousePositionEventBinded;

export default UIFramework.Component(
  class extends React.Component {
    static label = 'modal';
    static defaultProps = {
      onOk: noop,
      onCancel: noop,
      width: 520,
      transitionName: 'zoom',
      maskAnimation: 'fade',
      confirmLoading: false,
      visible: false,
      scrollable: true
    };
    static contextTypes = {
      antLocale: React.PropTypes.object,
    };
    static propTypes = {
      onOk: PropTypes.func,
      onCancel: PropTypes.func,
      okText: PropTypes.node,
      cancelText: PropTypes.node,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      confirmLoading: PropTypes.bool,
      visible: PropTypes.bool,
      align: PropTypes.object,
      footer: PropTypes.node,
      title: PropTypes.node,
      closable: PropTypes.bool,
      scrollable: PropTypes.bool
    };

    componentDidMount() {
      if (mousePositionEventBinded) {
        return;
      }
      // 只有点击事件支持从鼠标位置动画展开
      Dom.addEventListener(document.documentElement, 'click', (e) => {
        mousePosition = {
          x: e.pageX,
          y: e.pageY
        };
        // 20ms 内发生过点击事件，则从点击位置动画展示
        // 否则直接 zoom 展示
        // 这样可以兼容非点击方式展开
        setTimeout(() => mousePosition = null, 20);
      });
      mousePositionEventBinded = true;
      // scrollable
      if (this.props.scrollable) {
        window.onmousewheel = this.onMouseWheel.bind(this);
      }
    }
    
    componentWillUnmount() {
      if (this.props.scrollable) {
        window.onmousewheel = null;
      }
    }

    onMouseWheel(evt) {
      const newStyl = {
        marginTop: this.state.style.marginTop + evt.wheelDeltaY
      };
      this.setState({style: newStyl});
    }

    constructor(props) {
      super(props);
      this.state = {
        style: {
          marginTop: 0
        }
      };
      this.mousewheelHandler = this.onMouseWheel.bind(this);
    }

    render() {
      let props = this.props;
      let { okText, cancelText } = props;
      if (this.context.antLocale && this.context.antLocale.Modal) {
        okText = okText || this.context.antLocale.Modal.okText;
        cancelText = cancelText || this.context.antLocale.Modal.cancelText;
      }

      let defaultFooter = [
        <Button key="cancel"
          type="ghost"
          size="large"
          onClick={this.props.onCancel}>
          {cancelText || '取消'}
        </Button>,
        <Button key="confirm"
          type="primary"
          size="large"
          loading={props.confirmLoading}
          onClick={this.props.onOk}>
          {okText || '确定'}
        </Button>
      ];

      let footer;
      if (props.footer === undefined) {
        footer = defaultFooter;
      } else {
        footer = props.footer;
      }

      return (
        <Dialog 
          {...props}
          style={this.state.style}
          onClose={this.props.onCancel}
          footer={footer}
          visible={props.visible} 
          prefixCls={this.props.className}
          className={this.props.className + '-' + this.props.postfixCls}
          mousePosition={mousePosition}
        />
      );
    }
  }
);
