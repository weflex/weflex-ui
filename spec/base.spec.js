"use strict";

const React = require('react');
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;
const cheerio = require('cheerio');
const parse = require('style-parser');
const UIFramework = require('../').default;

describe('base component', function() {

  it('should expect Base modules', function() {
    expect(typeof UIFramework).toBe('function');
    expect(typeof UIFramework.Row).toBe('function');
    expect(typeof UIFramework.Label).toBe('function');
    expect(typeof UIFramework.Text).toBe('function');
    expect(typeof UIFramework.Button).toBe('function');
    expect(typeof UIFramework.TextInput).toBe('function');
    expect(typeof UIFramework.DateInput).toBe('function');
    expect(typeof UIFramework.TimeInput).toBe('function');
    expect(typeof UIFramework.Upload).toBe('function');
    expect(typeof UIFramework.Select).toBe('function');
    expect(typeof UIFramework.ColorPicker).toBe('function');
    expect(typeof UIFramework.Control).toBe('function');
  });

  describe('UIForm', function() {
    it('should return a ui component', function() {
      const node = React.createElement(UIFramework, {
        className: 'class',
      });
      const $ = cheerio.load(renderToStaticMarkup(node));
      expect($('.class').attr('class')).toBe('weflex-framework class');
    });
  });

  describe('UIText', function() {
    it('should return a ui component', function() {
      const node = React.createElement(UIFramework.Text, {
        className: 'class',
        text: 'text',
      });
      const $ = cheerio.load(renderToStaticMarkup(node));
      expect($('.class').attr('class')).toBe('weflex-text class');
      expect($('.class > p').text()).toBe('text');
    });
  });

  describe('UILabel', function() {
    it('should return a ui component', function() {
      const node = React.createElement(UIFramework.Label, {
        className: 'class',
        text: 'text',
      });
      const $ = cheerio.load(renderToStaticMarkup(node));
      expect($('.class').attr('class')).toBe('weflex-label class');
      expect($('.class > span').text()).toBe('text');
    });
  });

  describe('UIRow', function() {
    it('should return a ui component', function() {
      const node = React.createElement(UIFramework.Row, {
        name: 'name',
        hint: 'hint',
        children: React.DOM.div({
          id: 'foo',
        }, 'bar'),
      });
      const $ = cheerio.load(renderToStaticMarkup(node));
      expect($('label > span').text()).toBe('name');
      expect($('#foo').text()).toBe('bar');
    });
  });

  describe('Control', function() {
    it('should create a Control instance', function() {
      const control = new UIFramework.Control({
        bindStateCtx: {
          setState: function() {},
          state: {},
        },
        bindStateName: 'property',
      });
      expect(control.bindStateValue).toBe(undefined);
      expect(control.onChangeOnProps).toBe(null);
      const newProps = control.createProps();
      expect(newProps.type).toBe('text');
      expect(newProps.style.width).toBe(control.width);
      expect(typeof newProps.onChange).toBe('function');
      expect(typeof newProps.bindStateCtx).toBe('object');
      expect(typeof newProps.bindStateName).toBe('string');
    });

    describe('Control.createProps', function() {
      it('should set obj', function() {
        const props = new UIFramework.Control({}).createProps({
          foo: 'bar',
        });
        expect(props.foo).toBe('bar');
      });
      it('should set onChange', function() {
        function foobar() {}
        const ctrl = new UIFramework.Control({
          onChange: foobar,
        });
        const props = ctrl.createProps();
        expect(ctrl.onChangeOnProps).toBe(foobar);
      });
      it('should set onChange', function() {
        function foobar() {}
        const ctrl = new UIFramework.Control({});
        const props = ctrl.createProps({
          onChange: foobar,
        });
        expect(ctrl.onChangeOnProps).toBe(foobar);
      });
      it('should change type', function() {
        const props = new UIFramework.Control({}).createProps({
          type: 'time',
        });
        expect(props.type).toBe('time');
      });
      it('should change width from createProps', function() {
        const props = new UIFramework.Control({}).createProps({
          style: {
            width: '10px',
          },
        });
        expect(props.style.width).toBe('10px');
      });
      it('should change width from element props', function() {
        const props = new UIFramework.Control({
          style: {
            width: '20px',
          },
        }).createProps();
        expect(props.style.width).toBe('20px');
      });
      it('should change other styles', function() {
        const props = new UIFramework.Control({}).createProps({
          style: {
            minWidth: '100px',
          },
        });
        expect(props.style.minWidth).toBe('100px');
      });
    });

    describe('Control.flexbox', function() {
      it('should use a flex', function() {
        for (let flex = 0.1; flex <= 1.0; flex += 0.1) {
          const percent = parseInt(flex * 100);
          const element = React.createElement(UIFramework.Cell, {flex});
          const str = renderToStaticMarkup(element);
          const styles = parse(cheerio(str).attr('style'));
          expect(styles.width).toBe(`calc(${percent}% - 5px)`);
          expect(styles.display).toBe('inline-block');
        }
      });
    });

    describe('Control.componentWillMount', function() {
      it('should set bindStateValue if value is set', function(next) {
        const ctx = {
          state: {},
          setState: function(newState) {
            expect(newState.property).toBe('foobar');
            next();
          },
        };
        const control = new UIFramework.Control({
          bindStateCtx: ctx,
          bindStateName: 'property',
          value: 'foobar',
        });
        control.componentWillMount();
      });
    });
  });

});
