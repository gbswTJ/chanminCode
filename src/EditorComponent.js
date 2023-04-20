import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class EditorComponent extends Component {

  modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      [{ 'align': [] }, { 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
      ['clean']
    ],
  }

  formats = [
    //'font',
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background',
  ]

  render() {
    const { value, onChange } = this.props;
    return (
      <div style={{ margin: "0 auto",width: "1000px", height: "650px" }}>
        <ReactQuill
          style={{ width: "1000px",height: "600px" }}
          theme="snow"
          modules={this.modules}
          formats={this.formats}
          value={value}
          onChange={onChange}
          placeholder='내용을 입력해주세요'
        />
      </div>
    )
  }
}

export default EditorComponent;
