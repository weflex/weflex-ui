"use strict";

import React from 'react';
import { BindingComponent } from 'react-binding-component';

if (process.env.NODE_ENV !== 'test') {
  require('./framework.css');
}

/**
 * @class UIComponent
 */

var UIComponent = (ComposedComponent, isStateless) => {
  const themeConfig = require('./config');
  if (isStateless) {
    return (options) => {
      return ComposedComponent(options, themeConfig);
    };
  }
  return class extends React.Component {
    static propTypes = {
      /**
       * @property {String} className - the className
       */
      className: React.PropTypes.string,
      /**
       * @property {Object} config - the config
       */
      config: React.PropTypes.object,
      /**
       * @property {React.PropTypes.Node} children
       */
      children: React.PropTypes.node,
    };

    static defaultProps = {
      className: '',
      config: themeConfig,
    };
    
    /**
     * @method className
     * @param {String} label - the main class name which will be prefixed with current config
     * @param {Array} extra - the extra class names
     * @return {String} the concated className in string
     */
    className(label) {
      let config = this.props.config;
      let classNames = [];
      if (typeof label === 'string' && label !== '') {
        classNames.push(`${config.prefix}-${label.toLowerCase()}`);
      }
      if (typeof this.props.className && this.props.className !== '') {
        classNames.push(this.props.className);
      }
      return classNames.join(' ');
    }

    render() {
      const label = ComposedComponent.label || ComposedComponent.name;
      let styles;
      if (typeof ComposedComponent.styles === 'function') {
        styles = ComposedComponent.styles(this.props.config);
      } else {
        styles = ComposedComponent.styles;
      }

      const newProps = Object.assign({}, this.props, {
        self: ComposedComponent,
        styles: styles,
        className: this.className(label),
      });
      if (ComposedComponent.flexbox) {
        newProps.style = Object.assign(
          { width: '100%' }, newProps.style);
        return (
          <Cell flex={this.props.flex} 
            className={newProps.className}>
            <ComposedComponent {...newProps} />
          </Cell>
        );
      } else {
        return <ComposedComponent {...newProps} />;
      }
    }
  }
}

/**
 * @class UIRow
 * @extends UIComponent
 */
var Row = UIComponent(class extends React.Component {
  static label = 'row';
  static propTypes: {
    /**
     * @property {String} name - the row name
     */
    name: React.PropTypes.string,
    /**
     * @property {String} hint - the hint text
     */
    hint: React.PropTypes.string,
    /**
     * @property {Boolean} required - if true, this row value is required
     */
    required: React.PropTypes.bool,
  };
  
  static styles = {
    container: {
      marginBottom: '15px',
    },
    label: {
      marginBottom: '5px',
    },
    controls: {
      boxSizing: 'border-box',
      width: '100%',
    },
  };
  
  render() {
    let hint = null;
    if (this.props.name) {
      hint = (
        <div style={this.props.styles.label}>
          <Label 
            text={this.props.name}
            required={this.props.required} 
          />
          <Text text={this.props.hint} />
        </div>
      );
    }
    return (
      <div className={this.props.className}
        style={this.props.styles.container}>
        {hint}
        <div style={this.props.styles.controls}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

/**
 * @class Cell
 * @extends UIComponent
 */
var Cell = UIComponent(class Cell extends React.Component {
  static label = 'cell';
  static propTypes = {
    /**
     * @property {Number} flex - the flexbox value
     */
    flex: React.PropTypes.number,
    /**
     * @property {String} className - the class name
     */
    className: React.PropTypes.string,
    /**
     * @property {String} align - the position of this cell
     */
    align: React.PropTypes.oneOf(['left', 'right']),
  };

  static styles = {
    container: {
      display: 'inline-block',
      verticalAlign: 'top',
      marginRight: '5px',
    },
  };

  /**
   * @property {String} with - the width string of the instance by IControl
   */
  get width() {
    let val = 'auto';
    if (this.props.flex) {
      const percent = parseInt(this.props.flex * 100);
      val = `calc(${percent}% - ${this.props.styles.container.marginRight})`;
    }
    return val;
  }

  render() {
    const containerStyl = Object.assign({
      width: this.width
    }, this.props.styles.container);
    if (this.props.align) {
      containerStyl.float = this.props.align;
    }
    return (
      <div style={containerStyl}>
        {this.props.children}
      </div>
    );
  }
});

/**
 * @class Divider
 * @extends UIComponent
 */
var Divider = UIComponent(class Divider extends React.Component {
  static label = 'divider';
  static propTypes = {
    /**
     * @property {Number} height - the height
     */
    height: React.PropTypes.number,
    /**
     * @property {Number} stroke - the stroke width
     */
    stroke: React.PropTypes.number,
  };
  static defaultProps = {
    height: 20,
    stroke: 0,
  };
  render() {
    const margin = (this.props.height - this.props.stroke) / 2;
    return (
      <div className={this.props.className} style={{
        display: 'block',
        color: this.props.config['border-color-base'],
        height: this.props.stroke + 'px',
        marginTop: margin + 'px',
        marginBottom: margin + 'px',
      }}></div>
    );
  }
});

/**
 * @class UIText
 * @extends React.Component
 */
var Text = UIComponent(class Text extends React.Component {
  static label = 'text';
  static propTypes = {
    /**
     * @property {String} text - the text to display
     */
    text: React.PropTypes.string.isRequired,
  };

  static defaultProps = {
    text: '',
  };

  static styles = {
    container: {
      color: '#9b9b9b',
      fontSize: '12px',
      display: 'inline-block',
      verticalAlign: 'bottom',
    },
  };
  render() {
    return (
      <div className={this.props.className}
        style={Text.styles.container}>
        {this.props.text.split('\\n').map((line, key) => {
          return <p key={key}>{line}</p>;
        })}
      </div>
    );
  }
});

/**
 * @class UILabel
 * @extends React.Component
 */
var Label = UIComponent(class extends React.Component {
  static label = 'label';
  static propTypes = {
    /**
     * @property {String} className
     */
    className: React.PropTypes.string,
    /**
     * @property {String} text
     */
    text: React.PropTypes.string,
  };
  static styles = {
    container: {
      color: '#595959',
      fontSize: '14px',
      display: 'inline-block',
    },
    text: {
      marginRight: '10px',
    },
  };
  render() {
    return (
      <label className={this.props.className}
        style={this.props.self.styles.container}>
        <span style={this.props.self.styles.text}>{this.props.text}</span>
      </label>
    );
  }
});

/**
 * @class UIForm
 * @extends React.Component
 */
var UIFramework = UIComponent(class extends React.Component {
  static label = 'framework';
  render() {
    return (
      <div className={this.props.className}
        style={{
          padding: '5px',
          fontSize: '14px',
        }}>
        {this.props.children}
      </div>
    );
  }
});

/**
 * @class UIControl
 * @extends BindingComponent
 */
class UIControl extends BindingComponent {
  static propTypes: {
    /**
     * @property {Function} onChange - onChange function
     */
    onChange: React.PropTypes.func,
  };

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    this.onChangeOnProps = null;
  }

  componentWillMount() {
    if (this.props.bindStateCtx && !this.bindStateValue) {
      //TODO(Yorkie): should check if this has defaultValue
      if (this.defaultValue === undefined) {
        this.bindStateValue = this.props.value || this.props.defaultValue;
      } else {
        this.bindStateValue = this.defaultValue;
      }
    }
  }

  onInputChange(event) {
    this.onChange(event);
    if (typeof this.onChangeOnProps === 'function') {
      this.onChangeOnProps(event);
    }
  }

  /**
   * return the props object
   *
   * @method createProps
   * @param {Object} obj - the extend obj
   * @return {Object}
   */
  createProps(obj) {
    obj = obj || {};
    if (this.props.onChange) {
      this.onChangeOnProps = this.props.onChange;
    }
    if (obj.onChange) {
      this.onChangeOnProps = obj.onChange;
      delete obj.onChange;
    }
    const props = Object.assign({
      type: 'text'
    }, this.props, {
      onChange: this.onInputChange.bind(this),
    }, obj);
    props.style = props.style || {};
    return props
  }
  
}

UIFramework.Row = Row;
UIFramework.Cell = Cell;
UIFramework.Divider = Divider;
UIFramework.Text = Text;
UIFramework.Label = Label;
UIFramework.Component = UIComponent;
UIFramework.Control = UIControl;

export default UIFramework;
