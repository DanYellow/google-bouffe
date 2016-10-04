import 'babel-polyfill';
import React from 'react';

import SuggestionForm from './SuggestionForm'

export default class SuggestionContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<SuggestionForm />)
  }
}

const styles = {
  text: {
    color: '#da032c',
    fontFamily: "'open_sanssemibold', Arial, sans-serif"
  }
}