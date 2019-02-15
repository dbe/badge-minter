import React, { Component } from 'react';
import axios from 'axios';

class TokenForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);

    this.name = React.createRef();
    this.description = React.createRef();
    this.external = React.createRef();
    this.image = React.createRef();
    this.form = React.createRef();

    this.state = {
      file: undefined,
      imagePreviewUrl: undefined,
      error: undefined,
      submitting: false,
      success: false,
    }
  }

  handleSubmit(event) {
    if(this.form.current.checkValidity()) {
      event.preventDefault();

      this.setState({submitting: true});

      axios.post('https://kto3nk2oef.execute-api.us-east-1.amazonaws.com/default/mintToken', {
        name: this.name.current.value,
        description: this.description.current.value,
        image: this.state.imagePreviewUrl,
        external: this.external.current.value
      }).then(data => {
        this.setState({
          submitting: false,
          success: true,
          error: undefined
        })
      }).catch(e => {
        this.setState({
          submitting: false,
          success: false,
          file: undefined,
          imagePreviewUrl: undefined,
          error: "Token name already exists"
        })
      });

    }
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

  pacman() {
    return (
      <div className="lds-css ng-scope">
        <div className="lds-pacman">
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }

  renderForm() {
    return (
      <form className="mt-5" onSubmit={this.handleSubmit} ref={this.form}>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="name">Name</label>
          <div className="col-sm-9">
            <input className="form-control" type="text" name="name" id="name" placeholder="Secure Asset Fund for Users" ref={this.name} required></input>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="description">Description</label>
          <div className="col-sm-9">
            <input className="form-control" type="text" name="description" id="description" placeholder="Funds are SAFU" ref={this.description} required></input>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="external">External link</label>
          <div className="col-sm-9">
            <input className="form-control" type="text" name="external" id="external" placeholder="http://mysite.com" ref={this.external} required></input>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="image">Image</label>
          <div className="col-sm-9">
            <input className="form-control-file" type="file" name="image" id="image" onChange={this.handleFileChange} required></input>
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
    );
  }

  render() {
    let content = this.state.submitting ? this.pacman() : this.renderForm();

    return (
      <div className="card p-3 mt-5">
        <h1 className="card-title text-center">Mint new token</h1>
        {this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : ''}
        {this.state.success ? <div className="alert alert-success">Success</div> : content}
      </div>
    )
  }
}

export default TokenForm;
