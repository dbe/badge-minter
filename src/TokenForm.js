import React, { Component } from 'react';
import axios from 'axios';

class TokenForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);

    this.name = React.createRef();
    this.description = React.createRef();
    this.externalUrl = React.createRef();
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


  // <div class="card" style="width: 18rem;">
  //   <img class="card-img-top" src="..." alt="Card image cap">
  //   <div class="card-body">
  //     <h5 class="card-title">Card title</h5>
  //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  //     <a href="#" class="btn btn-primary">Go somewhere</a>
  //   </div>
  // </div>

  render() {
    return (
      <div className="card p-3">
        <h1 className="card-title text-center">Mint new token</h1>

        <form className="mt-5" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="name">Name</label>
            <div className="col-sm-9">
              <input className="form-control" type="text" name="name" id="name" placeholder="Secure Asset Fund for Users" ref={this.name}></input>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="description">Description</label>
            <div className="col-sm-9">
              <input className="form-control" type="text" name="description" id="description" placeholder="Funds are SAFU" ref={this.description}></input>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="image">Image</label>
            <div className="col-sm-9">
              <input className="form-control-file" type="file" name="image" id="image" onChange={this.handleFileChange}></input>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="external-url">External link</label>
            <div className="col-sm-9">
              <input className="form-control" type="text" name="external-url" id="external-url" placeholder="http://mysite.com" ref={this.externalUrl}></input>
            </div>
          </div>


          <div className="form-group row">
            <div className="col-sm-10">
              <img className="w-100" src={this.state.imagePreviewUrl} alt=""></img>
            </div>
          </div>

          <div className="form-group text-center">
            <input className="form-control btn auth-btn mb-2 w-50" type="submit" value="Submit" onClick={this.handleSubmit}/>
          </div>

        </form>
      </div>
    );
  }
}

export default TokenForm;
