import React from 'react';
import red from './../img/red-square-small.png'
import blank from './../img/blank.png'
import one from './../img/1.png'
import two from './../img/2.png'
import three from './../img/3.png'
import four from './../img/4.png'
import five from './../img/5.png'
import six from './../img/6.png'
import seven from './../img/7.png'
import eight from './../img/8.png'
import nine from './../img/9.png'
import ten from './../img/10.png'
import eleven from './../img/11.png'
import twelve from './../img/12.png'

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  renderNumber() {
    let src = blank;
    switch(this.props.value) {
    case 1:
        src = one;
        break;
    case 2:
        src = two;
        break;
    case 3:
        src = three;
        break;
    case 4:
        src = four;
        break;
    case 5:
        src = five;
        break;
    case 6:
        src = six;
        break;
    case 7:
        src = seven;
        break;
    case 8:
        src = eight;
        break;
    case 9:
        src = nine;
        break;
    case 10:
        src = ten;
        break;
    case 11:
        src = eleven;
        break;
    case 12:
        src = twelve;
        break;
    default:
        src = blank;
    }

    if (this.props.cardState == 'H') {
      src = blank;
    } else if (this.props.cardState == 'C') {
      src = red;
    }

    return (
      <a href="#" onClick={() => this.props.onClick()}>
        <img src={src} />
      </a>
    );
  }

  render() {

      return (

          this.renderNumber()

    );
  }
};
export default Card;
