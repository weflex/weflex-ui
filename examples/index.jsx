"use strict";

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import UIFramework from '../lib/index.js';

var ExampleIcon = () => (
  <a href="#" style={{
    width: '42px',
    height: '42px',
    borderRadius: '6px',
    background: '#eee',
    display: 'inline-block',
  }}></a>
);

class CommonModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  onOpen() {
    this.setState({visible: true});
  }
  onCancel() {
    this.setState({visible: false});
  }
  render() {
    return (
      <UIFramework.Row name="modal" hint="this is for modals">
        <UIFramework.Button onClick={this.onOpen.bind(this)}>
          Open Modal
        </UIFramework.Button>
        <UIFramework.Modal 
          title="this is first common modal" 
          visible={this.state.visible}
          onCancel={this.onCancel.bind(this)}>
          <p>hint</p>
        </UIFramework.Modal>
      </UIFramework.Row>
    );
  }
}

class ConformModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  onOpen() {
    UIFramework.Modal.confirm({
      title: '您是否确认要删除这项内容',
      content: '一些解释',
      onOk() {
        console.log('确定');
      },
    });
  }
  onOpen2() {
    UIFramework.Modal.info({
      title: '您是否确认要删除这项内容',
      content: '一些解释',
      onOk() {
        console.log('确定');
      },
      onCancel() {}
    });
  }
  render() {
    return (
      <UIFramework.Row name="modal" hint="this is for modals">
        <UIFramework.Button onClick={this.onOpen}>
          Open Confirm Modal
        </UIFramework.Button>
        <UIFramework.Button onClick={this.onOpen2}>
          Open Info Modal
        </UIFramework.Button>
      </UIFramework.Row>
    );
  }
}

class ExampleIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2015-04-22',
      time: '12:20',
    };
  }
  onClickIntervalButton() {
    // Replace
  }
  render() {
    return (
      <UIFramework>
        <UIFramework.Row name="title" hint="hint">
          <UIFramework.TextInput placeholder="haha" flex={0.4} />
          <UIFramework.TimeInput flex={0.3} />
          <UIFramework.DateInput flex={0.3} />
        </UIFramework.Row>
        <UIFramework.Row name="row2" hint="hint2 text">
          <UIFramework.TextInput />
        </UIFramework.Row>
        <UIFramework.Row name="buttons" hint="here we show how buttons work">
          <UIFramework.Button text="btn1" flex={0.1} />
          <UIFramework.Button text="btn2" flex={0.1} disabled={true} />
          <UIFramework.Button text="success" flex={0.1} level="success" />
          <UIFramework.Button text="error" flex={0.1} level="error" />
          <UIFramework.Button 
            text="interval" 
            flex={0.1} 
            interval={10} 
            onClick={this.onClickIntervalButton} 
          />
          <UIFramework.Button
            text="中文进度条"
            flex={0.1}
            interval={20}
            intervalFormat={(count) => `⌛️中...（${count}）`}
          />
          <UIFramework.Button flex={0.1}>
            <UIFramework.Icon type="wifi" /> icon
          </UIFramework.Button>
        </UIFramework.Row>
        <UIFramework.Row name="upload buttons">
          <UIFramework.Upload flex={0.2} name="file" action="/">
            <UIFramework.Button flex={1}>
              <UIFramework.Icon type="upload-cloud" /> upload
            </UIFramework.Button>
          </UIFramework.Upload>
        </UIFramework.Row>
        <UIFramework.Row name="badges">
          <UIFramework.Badge count={25} />
          <UIFramework.Badge count={2}>
            <ExampleIcon />
          </UIFramework.Badge>
          <UIFramework.Badge count={109}>
            <ExampleIcon />
          </UIFramework.Badge>
          <UIFramework.Badge dot>
            <ExampleIcon />
          </UIFramework.Badge>
        </UIFramework.Row>
        <UIFramework.Row name="progress" hint="this is progress bars">
          <UIFramework.Progress flex={0.3} percent={30} />
          <UIFramework.Progress flex={0.3} percent={30} status="exception" />
          <UIFramework.Progress 
            flex={0.4} 
            percent={90} 
            status="success" 
            showInfo={false} 
          />
        </UIFramework.Row>
        <UIFramework.Row name="selects" hint="this is progress bars">
          <UIFramework.Select defaultValue="lucy" flex={1} options={[
            {text: 'jack'},
            {text: 'lucy'},
          ]} />
        </UIFramework.Row>
        <CommonModalExample />
        <ConformModalExample />
      </UIFramework>
    );
  }
}

(function () {
  ReactDOM.render(
    <ExampleIndex />,
    document.getElementById('root-container'));
})();