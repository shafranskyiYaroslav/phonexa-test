import React from 'react';
import data from '../api';
import Information from './Information';
import store from '../state';

class SecondStep extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [data.departments][0],
      department: 'empty',
      vacancy: 'Vacancy',
      index: -1,
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  handleChange = (event) => {
    (event.target.closest('select').name === 'department') ?
    this.setState({
      [event.target.name]: event.target.value,
      index: Object.keys(this.state.data).indexOf(event.target.value),
    }) :
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.vacancy !== 'Vacancy') {
    store.dispatch({type: 'SUBMIT_SECOND_STEP'});
  }};

  render() {
    const { isSecondStepHidden } = store.getState();
    return (
      <React.Fragment>
        <div className='form-div clearfix'>
          <form name='secondForm'
          onSubmit={this.handleSubmit}
          style={isSecondStepHidden ? {display: 'none'} : {display: 'block'}}>
            <h5>Choose your specialization</h5>    
              <select name='department' value={this.state.department} onChange={this.handleChange}>
                <option name='emptyDepartment'>Department</option>
                {
                  Object.keys(this.state.data).map(el => (
                    <option name={el} key={el} value={el}>{el}</option>
                  ))
                }
              </select>
              <select style={this.state.index === -1 ? {backgroundColor: 'grey'} : {background: 'white'}}
              name='vacancy'
              value={this.state.vacancy}
              onChange={this.handleChange}>
                <option name='emptyVacancy'>Vacancy</option>
                {
                  this.state.index === -1 ? '' :             
                  Object.values(this.state.data)[this.state.index].map(el => (
                  <option name={el} key={el} value={el}>{el}</option>
                  ))
                }
              </select>
            <button disabled={this.state.index === -1} type='submit'>Next Step</button>
          </form>
        </div>
        <Information userInfo={[...this.props.userInfo, this.state.department, this.state.vacancy]}/>
      </React.Fragment>
    )
  }
}

export default SecondStep;
