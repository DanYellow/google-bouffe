import 'babel-polyfill';
import React from 'react';

import Survey from './Survey'

export default class SurveyContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      survey: {}
    }
  }

  componentDidMount() {
    // Retrieve content survey
    fetch(`${window.boBaseURL}/survey/survey_57f299c32248c`, {
        mode: 'cors'
      })
      .then(response => response.json())
      .then(json =>
        this.setState({ survey: json.response })
      ).catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
      });
  }

  _renderPlaceholderView() {
    return (
      <div>Pending...</div>
    )
  }

  render() {
      if (!Object.keys(this.state.survey).length) {
          return this._renderPlaceholderView()
      }

      return <Survey {...this.state.survey} />
  }
}

