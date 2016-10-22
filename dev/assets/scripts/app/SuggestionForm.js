import 'babel-polyfill';
import React from 'react';

import styles from './../../stylesheets/form.css';
import button from './../../stylesheets/button.css';
import map from './../../stylesheets/map.css';

export default class SuggestionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestionSubmited: false
    }
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
      if (!formData[key]) {
        continue;
      }
      queryString += `${key}=${formData[key]}&`;
    }

    queryString = queryString.substring(0, queryString.length - 1);
    
    fetch(`${window.boBaseURL}/suggestion/create?${queryString}`, {
        method: 'POST',
        body: {},
        mode: 'cors'
      })
      .then(response => response.json())
      .then(function(json) {
        // console.log(json)
        this.setState({ suggestionSubmited: true })
      }.bind(this))
  }

  render() {
    let content = this._renderForm();

    if (this.state.suggestionSubmited) {
      content = this._renderFormSuccess();
    }

    return (
      <section className={map.map}>
        { content }
      </section>
    )
  }

  _renderFormSuccess () {
    return (
      <p> Suggestion enregistrée ! </p>
    )
  }

  _renderForm () {
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
          <input name='address' placeholder='Adresse (rue + code postal)' />
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
