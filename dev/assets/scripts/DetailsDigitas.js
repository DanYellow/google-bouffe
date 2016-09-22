import 'babel-polyfill';
import React from 'react';
import Radium from 'radium';


@Radium
export default class DetailsDigitas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (typeof this.props.restaurant.budgetScale === "undefined") {
      return null;
    }

    var tags = null;
    if (this.props.restaurant.tags.length) {
      tags = <ul style={styles.tags}>
            {this.props.restaurant.tags.map(function(tag, index) {
              return <li key={ Date.now() + index } style={styles.tag} title={ window.tagsRef[tag].description }>{ window.tagsRef[tag].title || "Meilleur restaurant ever" }</li>;
          }) }
        </ul>
    }

    var description = "";
    if (this.props.restaurant.description) {
      description = `‘‘${this.props.restaurant.description}’’`
    }

    return (
      <section style={styles.container}>
        <header>
          <h1 style={styles.title}>{this.props.restaurant.title}</h1>
          <p itemProp="streetAddress"><span>Adresse : </span>{this.props.restaurant.address}</p>
        </header>
        <blockquote itemProp="description" style={styles.description}>{ description }</blockquote>
        { tags }
      </section>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    flex: .35,
    padding: '0 5px 5px 15px',
    borderLeft: '1px solid #da032c',
    marginLeft: '10px'
  },
  title: {
    fontFamily: "'Heveltica Neue', Arial, sans-serif",
    fontSize: "26px",
    color: "#333333"
  },
  description: {
    fontFamily: "Georgia, serif",
    fontSize: "18px",
    margin: "30px 0",
    fontStyle: "italic",
    color: "#da032c"
  },
  tag: {
    fontSize: "14px",
    color: "#00b21f",
    textTransform: "uppercase",
    borderLeft: '1px solid #00b21f',
    paddingLeft: '5px',
    minWidth: '100px',
    marginBottom: '10px'
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: "45px"
  },
  meterContainer: {
    width: '100%',
    backgroundColor: '#dcdcdc',
    height: '9px',
    borderRadius: '3px'
  }
}