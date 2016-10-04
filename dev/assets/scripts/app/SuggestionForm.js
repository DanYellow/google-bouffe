import 'babel-polyfill';
import React from 'react';

import styles from './../../stylesheets/form.css';

export default class SuggestionContainer extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <form className={styles.form} name="suggest">
        <legend>Suggérer un restaurant</legend>
        <fieldset>
          <label>Nom du restaurant *</label>
          <input name='name' placeholder='Nom du restaurant *' />
        </fieldset>
        <fieldset>
          <label>Description</label>
          <textarea name='description' value='This is a description.' />
        </fieldset>
        <fieldset>
          <label>Adresse</label>
          <input name='adresse' placeholder='Nom du restaurant' />
        </fieldset>
        <fieldset>
          <label>Budget</label>
          <input name='adresse' placeholder='Budget' type='number' step='1' min='0' max='10' value='5' />
        </fieldset>
      </form>
    )
  }
}
