import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import './styles.scss';

function Homepage(props) {
  const { data, isLoadingData } = props;
  useEffect(() => {
    props.actions.getListUser();
  }, [props.actions]);

  if (isLoadingData && !data) {
    return (<div>Data is loading...</div>);
  }
  return (
    <div className='home-containers'>
      {data && <ul>
        {data.map(dt => <li key={dt.id}>{dt.username}</li>)}
      </ul>}
    </div>
  );
}
const mapStateToProps = state => ({
  data: state.homeReducer.get('data'),
  isLoadingData: state.homeReducer.get('isLoadingData'),
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch),
});
Homepage.propTypes = {
  actions: PropTypes.shape({
    getListUser: PropTypes.func,
  }),
  data: PropTypes.arrayOf(PropTypes.shape({})),
  isLoadingData: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
