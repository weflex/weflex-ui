import React from 'react';
import Animate from 'rc-animate';
import ScrollNumber from './scroll-number';
import UIFramework from '../framework';

export default UIFramework.Component(class extends React.Component {
  static label = 'badge';
  static flexbox = true;
  static propTypes = {
    count: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    dot: React.PropTypes.bool,
    overflowCount: React.PropTypes.number,
  };
  static defaultProps = {
    count: null,
    dot: false,
    overflowCount: 99,
  };
  static styles = {
    container: {
      position: 'relative',
      display: 'inline-block',
      lineHeight: 1,
      verticalAlign: 'middle',
      marginRight: '16px',
    },
  };
  render() {
    let { 
      count, 
      overflowCount, 
      className, 
      style,
      config,
      children 
    } = this.props;
    const dot = this.props.dot;

    count = count > overflowCount ? `${overflowCount}+` : count;

    // dot mode don't need count
    if (dot) {
      count = '';
    }

    // null undefined "" "0" 0
    const hidden = (!count || count === '0') && !dot;
    return (
      <span className={className} 
        title={count} 
        style={this.props.styles.container}>
        {children}
        <Animate 
          component=""
          showProp="data-show"
          transitionName={`${config.prefix}-zoom`}
          transitionAppear>
          {
            hidden ? null :
              <ScrollNumber 
                data-show={!hidden}
                isWrapper={!!children}
                count={count} 
                style={style} 
              />
          }
        </Animate>
      </span>
    );
  }
})
