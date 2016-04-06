import React, { createElement } from 'react';
import { isCssAnimationSupported } from 'css-animation';
import UIFramework from '../framework';

function getNumberArray(num) {
  return num ?
    num.toString().split('').reverse().map(i => Number(i)) : [];
}

export default UIFramework.Component(class extends React.Component {
  static label = 'scroll-number';
  static propTypes = {
    count: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    isWrapper: React.PropTypes.bool,
    component: React.PropTypes.string,
    onAnimated: React.PropTypes.func,
    height: React.PropTypes.number,
  };

  static defaultProps = {
    count: null,
    isWrapper: false,
    component: 'sup',
    onAnimated() {},
    height: 18,
  };

  static styles = (config) => {
    return {
      container: {
        overflow: 'hidden',
      },
      only: {
        display: 'inline-block',
        transition: config.transition,
      },
      number: {
        fontSize: '12px',
        fontFamily: 'tahoma',
      },
      count: {
        position: 'absolute',
        transform: 'translateX(-50%)',
        top: '-10px',
        height: '20px',
        borderRadius: '10px',
        minWidth: '20px',
        background: config.colors.error,
        border: '1px solid transparent',
        color: '#fff',
        lineHeight: '18px',
        textAlign: 'center',
        padding: '0 6px',
        whiteSpace: 'nowrap',
        transformOrigin: '-10% center',
        zIndex: 10,
        boxShadow: '0 0 0 1px #fff',
        cursor: 'pointer',
      },
      dot: {
        position: 'absolute',
        transform: 'translateX(-50%)',
        transformOrigin: '0px center',
        top: '-4px',
        height: '8px',
        width: '8px',
        borderRadius: '100%',
        background: config.colors.error,
        zIndex: 10,
        boxShadow: '0 0 0 1px #fff',
        cursor: 'pointer',
      },
      isNotWrapper: {
        top: 'auto',
        display: 'block',
        position: 'relative',
        transform: 'translateX(0)',
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      animateStarted: true,
      count: props.count
    };
  }

  getPositionByNum(num, i) {
    if (this.state.animateStarted) {
      return 10 + num;
    }
    const currentDigit = getNumberArray(this.state.count)[i];
    const lastDigit = getNumberArray(this.lastCount)[i];
    // 同方向则在同一侧切换数字
    if (this.state.count > this.lastCount) {
      if (currentDigit >= lastDigit) {
        return 10 + num;
      }
      return 20 + num;
    }
    if (currentDigit <= lastDigit) {
      return 10 + num;
    }
    return num;
  }

  componentWillReceiveProps(nextProps) {
    if ('count' in nextProps) {
      if (this.state.count === nextProps.count) {
        return;
      }
      this.lastCount = this.state.count;
      // 复原数字初始位置
      this.setState({
        animateStarted: true,
      }, () => {
        // 等待数字位置复原完毕
        // 开始设置完整的数字
        setTimeout(() => {
          this.setState({
            animateStarted: false,
            count: nextProps.count,
          }, () => {
            this.props.onAnimated();
          });
        }, 5);
      });
    }
  }

  renderNumberList() {
    const childrenToReturn = [];
    for (let i = 0; i < 30; i++) {
      childrenToReturn.push(
        <p key={i} style={this.props.styles.number}>{i % 10}</p>
      );
    }
    return childrenToReturn;
  }

  renderCurrentNumber(num, i) {
    const position = this.getPositionByNum(num, i);
    const height = this.props.height;
    const removeTransition = this.state.animateStarted ||
      (getNumberArray(this.lastCount)[i] === undefined);
    return createElement('span', {
      key: i,
      style: Object.assign({
        transition: removeTransition && 'none',
        WebkitTransform: `translate3d(0, ${-position * height}px, 0)`,
        transform: `translate3d(0, ${-position * height}px, 0)`,
        height,
      }, this.props.styles.only),
    }, this.renderNumberList());
  }

  renderNumberElement() {
    const state = this.state;
    if (!state.count || isNaN(state.count)) {
      return state.count;
    }
    return getNumberArray(state.count)
      .map((num, i) => this.renderCurrentNumber(num, i)).reverse();
  }

  render() {
    const props = {
      ...this.props,
      className: this.props.className,
    };
    if (props.count) {
      props.style = Object.assign(
        this.props.styles.container, this.props.styles.count);
    } else {
      props.style = Object.assign(
        this.props.styles.container, this.props.styles.dot);
    }
    if (!props.isWrapper) {
      props.style = Object.assign(props.style, this.props.styles.isNotWrapper);
    }
    const isBrowser = (typeof document !== 'undefined' && typeof window !== 'undefined');
    if (isBrowser && isCssAnimationSupported) {
      return createElement(
        this.props.component,
        props,
        this.renderNumberElement()
      );
    }
    return createElement(
      this.props.component,
      props,
      props.count
    );
  }
})
