import Root from './Root';
import { connect } from 'react-redux';

const mapStateToProps = ({ posts }) => (
{
  posts
});

export default connect(
  mapStateToProps,
  null
)(Root)