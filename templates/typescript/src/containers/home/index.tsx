import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux/es/redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import './styles.scss';

type HomepageProps = {
  actions: {
    getListUser: () => void
  },
  data: Array<{
    id: string,
    username: string,
  }>,
  isLoadingData: boolean,
}
function Homepage(props: HomepageProps): JSX.Element {
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
