import React  from 'react';
import { bindActionCreators } from 'redux/es/redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import './App.scss';

function App(props) {
    function handleClick() {
        props.actions.getData();
    }
    return (
        <div className="App">
            <button onClick={handleClick} disabled={props.isLoadingData}>Click me</button>
        </div>
    );
}
const mapStateToProps = state => ({
  data: state.homeReducer.get('data'),
  isLoadingData: state.homeReducer.get('isLoadingData'),
});
const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators({...actions}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
