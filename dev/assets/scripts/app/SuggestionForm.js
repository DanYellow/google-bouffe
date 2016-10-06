import 'babel-polyfill';
import React from 'react';

import styles from './../../stylesheets/form.css';
import button from './../../stylesheets/button.css';

export default class SuggestionContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  _onSumbit(e) {
    e.preventDefault();

    let formData = {};
    
    [].slice.call(e.target.elements).forEach(function(element) {
      if (element.name) {
        formData[element.name] = element.value;
      }
    });

    if (!formData.name || formData.name == '') {
      return;
    }

    let queryString = '';
    for (let key in formData) {
      queryString += `${key}=${formData[key]}&`;
    }
    
    fetch(`${window.boBaseURL}/suggestion/create`, {
        method: 'POST',
        body: {}
      })
      .then(response => response.json())
      .then(function(json) {
      }.bind(this))
  }

  render() {
    return (
      <form className={styles.form} name="suggest" onSubmit={(e) => this._onSumbit(e) }>
        <legend>Suggérer un restaurant</legend>
        <fieldset>
          <label>Nom du restaurant *</label>
          <input name='name' placeholder='Nom du restaurant *' />
        </fieldset>
        <fieldset>
          <label>Description</label>
          <textarea name='description' placeholder='Description' />
        </fieldset>
        <fieldset>
          <label>Adresse</label>
          <input name='adresse' placeholder='Adresse (rue + code postal)' />
        </fieldset>
        <fieldset>
          <label>Budget</label>
          <input name='budget' placeholder='Budget' type='number' step='1' min='0' max='10' defaultValue='5' />
        </fieldset>
        <fieldset>
          <button style={{marginTop: 'auto'}}
          type="submit"
          className={[button.reset, button.cta, button.fullwidth, button.tall].join(' ')}>Envoyer ma suggestion</button>
        </fieldset>

      </form>
    )
  }
}
