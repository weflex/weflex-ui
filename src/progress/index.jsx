import React from 'react';
import UIFramework from '../framework';

export default UIFramework.Component(class extends React.Component {
  static label      = 'progress-line';
  static flexbox    = true;
  static propTypes  = {
    status: React.PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
    showInfo: React.PropTypes.bool,
    percent: React.PropTypes.number,
    strokeWidth: React.PropTypes.number,
    trailColor: React.PropTypes.string,
    format: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.string,
      React.PropTypes.func,
    ]),
  };
  static defaultProps = {
    percent: 0,
    strokeWidth: 10,
    status: 'normal',
    showInfo: true,
    trailColor: '#f3f3f3',
  };
  static styles = (config) => {
    return {
      container: {
        display: 'inline-block',
        width: '100%',
        fontSize: '12px',
        position: 'relative',
      },
      outer: {
        marginRight: '45px',
      },
      inner: {
        display: 'inline-block',
        width: '100%',
        backgroundColor: '#f3f3f3',
        borderRadius: '100px',
      },
      bg: {
        borderRadius: '100px',
        backgroundColor: config.colors.info,
        transition: config.transition,
        position: 'relative',
      },
      text: {
        position: 'absolute',
        top: '0',
        right: '0',
        width: '35px',
        textAlign: 'left',
        fontSize: '1em',
        marginLeft: '10px',
      },
    };
  }

  render() {
    let props = { ...this.props };

    if (parseInt(props.percent, 10) === 100) {
      props.status = 'success';
    }

    // styles
    let containerStyl = Object.assign({}, props.styles.container, props.style);
    let outerStyl = Object.assign({}, props.styles.outer);
    let bgStyl = Object.assign({}, props.styles.bg, {
      width: `${props.percent}%`,
      height: props.strokeWidth,
    });

    let progressInfo;
    let text = props.format || `${props.percent}%`;
    if (typeof props.format === 'string') {
      text = props.format.replace('${percent}', props.percent);
    } else if (typeof props.format === 'function') {
      text = props.format(props.percent);
    }

    if (props.showInfo === true) {
      progressInfo = <span style={props.styles.text}>{text}</span>;
    } else {
      outerStyl.marginRight = '0px';
    }

    if (props.status === 'exception') {
      bgStyl = Object.assign(bgStyl, {
        backgroundColor: props.config.colors.error,
      });
    } else if (props.status === 'success') {
      bgStyl = Object.assign(bgStyl, {
        backgroundColor: props.config.colors.success,
      });
    }

    return (
      <div className={this.props.className} style={containerStyl}>
        {progressInfo}
        <div style={outerStyl}>
          <div style={props.styles.inner}>
            <div style={bgStyl}></div>
          </div>
        </div>
      </div>
    );
  }
})
