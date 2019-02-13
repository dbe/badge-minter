import React, { Component } from 'react';

import axios from 'axios';

class TokenForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);

    this.name = React.createRef();
    this.description = React.createRef();
    this.image = React.createRef();

    this.state = {
      file: undefined,
      imagePreviewUrl: undefined
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('https://kto3nk2oef.execute-api.us-east-1.amazonaws.com/default/mintToken', {
      name: this.name.current.value,
      description: this.description.current.value,
      image: this.state.imagePreviewUrl
    }).then(data => {
      console.log('data: ', data);
    }).catch(e => {
      console.log('e: ', e);
    });
  }

  handleFileChange(event) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
     this.setState({
       file: file,
       imagePreviewUrl: reader.result
     });
    }

    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div style={{border: '1px solid black'}}>
        <h1>Mint new token</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="image">Image</label>
            <input type="file" name="image" id="image" onChange={this.handleFileChange}></input>
          </div>

          <div>
            <img src={this.state.imagePreviewUrl} alt=""></img>
          </div>

          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" ref={this.name}></input>
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" ref={this.description}></input>
          </div>

          <div>
            <input type="submit" value="Submit" onClick={this.handleSubmit}/>
          </div>

        </form>
      </div>
    );
  }
}

export default TokenForm;
