import React from 'react';
import store from '../state';

class Information extends React.Component {

  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  handleSubmit = (event) => {
    localStorage.setItem('personalInfo', JSON.stringify(this.props.userInfo));
    alert("Thank you!");
    console.log(localStorage.getItem('personalInfo'));
    store.dispatch({type: 'RETURN_TO_FIRST_STEP'});
  }

  handleReturn = (event) => {
    event.preventDefault();
    store.dispatch({type: 'RETURN_TO_FIRST_STEP'});
  }

  render() {
    const { isThirdStepHidden } = store.getState();
    return (
      <div id='info-div' style={isThirdStepHidden ? {display: 'none'} : {display: 'block'}}>
        <form>
          <ul>
            <h5>Check your information:</h5>
            <li><strong>Name:</strong>{this.props.userInfo[0]}{this.props.userInfo[1]}</li>
            <li><strong>Login:</strong>{this.props.userInfo[2]}</li>
            <li><strong>Email:</strong>{this.props.userInfo[3]}</li>
            <li><strong>Company:</strong>{this.props.userInfo[4]}</li>
            <li><strong>Department:</strong>{this.props.userInfo[5]}</li>
            <li><strong>Job Title:</strong>{this.props.userInfo[6]}</li>
          </ul>
          <p>Click send if everything correct. Click edit if you see error</p>

          <button onClick={this.handleReturn}>Edit</button>
          <button type='submit' onClick={this.handleSubmit}>Send</button>
        </form>
      </div>
    )
  }
}

export default Information;
