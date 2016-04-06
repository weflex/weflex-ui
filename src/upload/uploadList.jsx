import React from 'react';
import Animate from 'rc-animate';
import UIFramework from '../framework';
import Icon from '../icon';
import { Line } from '../progress';

const previewFile = (file, callback) => {
  const reader = new FileReader();
  reader.onloadend = function () {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
};

export default UIFramework.Component(class extends React.Component {
  static label = 'upload-list';
  static flexbox = true;
  static defaultProps = {
    items: [],
    listType: 'text',
    progressAttr: {
      strokeWidth: 3,
      showInfo: false,
    },
  };
  handleClose(file) {
    this.props.onRemove(file);
  }
  componentDidUpdate() {
    if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
      return;
    }
    this.props.items.forEach((file) => {
      if (typeof document === 'undefined' ||
          typeof window === 'undefined' ||
          !window.FileReader || !window.File ||
          !(file.originFileObj instanceof File) ||
          file.thumbUrl !== undefined) {
        return;
      }
      /*eslint-disable */
      file.thumbUrl = '';
      /*eslint-enable */
      previewFile(file.originFileObj, (previewDataUrl) => {
        /*eslint-disable */
        file.thumbUrl = previewDataUrl;
        /*eslint-enable */
        this.forceUpdate();
      });
    });
  }
  render() {
    let config = this.props.config;
    let list = this.props.items.map((file) => {
      let progress;
      let icon = <Icon type="paper-clip" />;

      if (this.props.listType === 'picture' || this.props.listType === 'picture-card') {
        if (file.status === 'uploading' || (!file.thumbUrl && !file.url)) {
          if (this.props.listType === 'picture-card') {
            icon = <div className={`${config.prefix}-list-item-uploading-text`}>文件上传中</div>;
          } else {
            icon = <Icon className={`${config.prefix}-list-item-thumbnail`} type="picture" />;
          }
        } else {
          icon = (<a className={`${config.prefix}-list-item-thumbnail`}
            href={file.url}
            target="_blank"><img src={file.thumbUrl || file.url} alt={file.name} /></a>
          );
        }
      }

      if (file.status === 'uploading') {
        progress = (
          <div className={`${config.prefix}-list-item-progress`}>
            <Line {...this.props.progressAttr} percent={file.percent} />
          </div>
        );
      }
      return (
        <div className={this.props.className} key={file.uid}>
          <div className={`${config.prefix}-list-item-info`}>
            {icon}
            {file.url
               ? <a href={file.url} target="_blank" className={`${config.prefix}-list-item-name`}>{file.name}</a>
               : <span className={`${config.prefix}-list-item-name`}>{file.name}</span>}
            {
              this.props.listType === 'picture-card' && file.status !== 'uploading'
              ? (
                <span>
                  <a href={file.url} target="_blank" style={{ pointerEvents: file.url ? '' : 'none' }}><Icon type="eye-o" /></a>
                  <Icon type="delete" onClick={this.handleClose.bind(this, file)} />
                </span>
              ) : <Icon type="cross" onClick={this.handleClose.bind(this, file)} />
            }
          </div>
          { progress }
        </div>
      );
    });
    return (
      <div className={this.props.className}>
        <Animate transitionName={`${config.prefix}-margin-top`}>
          {list}
        </Animate>
      </div>
    );
  }
})
