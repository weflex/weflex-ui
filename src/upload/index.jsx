import React from 'react';
import RcUpload from 'rc-upload';
import UIFramework from '../framework';
import UploadList from './uploadList';
import getFileItem from './getFileItem';

const noop = () => {};
const T = () => true;

// Fix IE file.status problem
// via coping a new Object
function fileToObject(file) {
  return {
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.filename || file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    response: file.response,
    error: file.error,
    percent: 0,
    originFileObj: file,
  };
}

/**
 * 生成Progress percent: 0.1 -> 0.98
 *   - for ie
 */
function genPercentAdd() {
  let k = 0.1;
  const i = 0.01;
  const end = 0.98;
  return function (s) {
    let start = s;
    if (start >= end) {
      return start;
    }

    start += k;
    k = k - i;
    if (k < 0.001) {
      k = 0.001;
    }
    return start * 100;
  };
}

export default UIFramework.Component(class extends React.Component {
  static label = 'upload';
  static flexbox = true;
  static defaultProps = {
    type: 'select',
    multiple: false,
    action: '',
    data: {},
    accept: '',
    onChange: noop,
    beforeUpload: T,
    showUploadList: true,
    listType: 'text',
    className: '',
    action: 'http://upload.qiniu.com/',
  };
  static styles = {
    clickable: {
      display: 'inline-block',
      width: '100%',
      height: '100%',
    },
  };
  constructor(props) {
    super(props);
    this.uploadData = {};
    this.state = {
      fileList: this.props.fileList || this.props.defaultFileList || [],
      dragState: 'drop'
    };
  }
  onStart() {
    // FIXME(Yorkie): i dont know what to do here
  }
  onError(err) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(err);
    }
  }
  onProgress() {
    // TODO(Yorkie): just for ui
  }
  onSuccess(result, file) {
    if (typeof this.props.onSuccess === 'function') {
      this.props.onSuccess(result, file);
    }
  }
  beforeUpload(file) {
    this.uploadData = {
      'token': this.props.token,
      'x:size': file.size,
    };
  }
  render() {
    let type = this.props.type || 'select';
    let props = {
      ...this.props,
      data: () => this.uploadData,
      style: this.props.styles.clickable,
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess.bind(this),
      beforeUpload: this.beforeUpload.bind(this),
    };
    let uploadList;
    if (this.props.showUploadList) {
      uploadList = (
        <UploadList listType={this.props.listType}
          items={this.state.fileList}
          onRemove={this.handleManualRemove} />
      );
    }
    if (type === 'drag') {
      let dragUploadingClass = this.state.fileList.some(file => file.status === 'uploading')
        ? `${prefixCls}-drag-uploading` : '';
      let draggingClass = this.state.dragState === 'dragover'
        ? `${prefixCls}-drag-hover` : '';
      return (
        <span className={this.props.className}>
          <div className={`${prefixCls} ${prefixCls}-drag ${dragUploadingClass} ${draggingClass}`}
            onDrop={this.onFileDrop}
            onDragOver={this.onFileDrop}
            onDragLeave={this.onFileDrop}>
            <RcUpload {...props}>
              <div className={`${prefixCls}-drag-container`}>
                {this.props.children}
              </div>
            </RcUpload>
          </div>
          {uploadList}
        </span>
      );
    } else if (type === 'select') {
      const uploadButtonCls = `${props.config.prefix}-select`;
      if (props.listType === 'picture-card') {
        return (
          <span className={props.className}>
            {uploadList}
            <RcUpload {...props}>{props.children}</RcUpload>
          </span>
        );
      }
      return (
        <span className={props.className}>
          <RcUpload {...props} style={{display: 'inline-block'}}>
            {props.children}
          </RcUpload>
          {uploadList}
        </span>
      );
    }
  }
})
