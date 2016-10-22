import 'babel-polyfill';
import React from 'react';

import uuid from 'node-uuid';
import Recharts, {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


export default class SurveyResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.results.map((vote, index) => {
          return <li key={uuid.v1()}> { vote.title } : { vote.nbResponses }</li>
        })}
      </ul>
    )
  }
}