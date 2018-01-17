import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import red from './img/red-square-small.png'
import blank from './img/blank.png'
import one from './img/1.png'
import two from './img/2.png'
import three from './img/3.png'
import four from './img/4.png'
import five from './img/5.png'
import six from './img/6.png'
import seven from './img/7.png'
import eight from './img/8.png'
import nine from './img/9.png'
import ten from './img/10.png'
import eleven from './img/11.png'
import twelve from './img/12.png'

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
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsValue: Array(24).fill(null),
      cardsState: Array(24).fill(null),
      currentNumber: null,
      currentIndex: null,
    }

    for (var i = 0; i < this.state.cardsValue.length; i++) {
      this.state.cardsValue[i] = (i % 12) + 1;
      this.state.cardsState[i] = 'C'; // C: covered, R: revealed, H: hidden
    }

  }

  revealTile(i) {
    const cardsState = this.state.cardsState.slice();
    cardsState[i] = 'R';
    this.setState({
      cardsState: cardsState,
    })
  }

  coverTile(i) {
    const cardsState = this.state.cardsState.slice();
    cardsState[i] = 'C';
    this.setState({
      cardsState: cardsState,
    })
  }

  coverPair(i, j) {
    this.coverTile(i);
    this.coverTile(j);
  }

  timeoutCoverFunction(obj, i, j) {
    setTimeout(() => {obj.coverPair(i, j)}, 1000);
  }

  hideTile(i) {
    const cardsState = this.state.cardsState.slice();
    cardsState[i] = 'H';
    this.setState({
      cardsState: cardsState,
    })
  }

  hidePair(i, j) {
    this.hideTile(i);
    this.hideTile(j);
  }

  // this is a workaround for react scoping issues
  timeoutHideFunction(obj, i, j) {
    setTimeout(() => {obj.hidePair(i, j)},1000);
  }

  handleClick(i) {
    //console.log("handling click");
    const cardsState = this.state.cardsState.slice();
    this.revealTile(i);
    if (this.state.currentNumber == null) { // no card exposed


      this.setState({
        currentIndex: i,
        currentNumber: this.state.cardsValue[i],
      });

    } else if ((this.state.currentNumber === this.state.cardsValue[i]) && (this.state.currentIndex != i)) { // cards match
      //console.log("current number is same as clicked number: " + this.state.currentNumber);

      this.timeoutHideFunction(this, i, this.state.currentIndex);

      this.setState({
        currentIndex: null,
        currentNumber: null,
      })


    } else { // cards don't match
      //console.log("current number is not equal to clicked number: " + this.state.currentNumber);

      this.timeoutCoverFunction(this, i, this.state.currentIndex);

      this.setState({
        currentNumber: null,
        currentIndex: null,
      })

    }
    //console.log("current number is: " + this.state.currentNumber);
    //console.log("current index is: " + this.state.currentIndex);


  }

  renderCard(i) {
    return (
      <Card
        value={this.state.cardsValue[i]}
        cardState = {this.state.cardsState[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="game">
          <div className="board-row">
            {this.renderCard(0)}
            {this.renderCard(1)}
            {this.renderCard(2)}
            {this.renderCard(3)}
          </div>
          <div className="board-row">
            {this.renderCard(4)}
            {this.renderCard(5)}
            {this.renderCard(6)}
            {this.renderCard(7)}
          </div>
          <div className="board-row">
            {this.renderCard(8)}
            {this.renderCard(9)}
            {this.renderCard(10)}
            {this.renderCard(11)}
          </div>
          <div className="board-row">
            {this.renderCard(12)}
            {this.renderCard(13)}
            {this.renderCard(14)}
            {this.renderCard(15)}
          </div>
          <div className="board-row">
            {this.renderCard(16)}
            {this.renderCard(17)}
            {this.renderCard(18)}
            {this.renderCard(19)}
          </div>
          <div className="board-row">
            {this.renderCard(20)}
            {this.renderCard(21)}
            {this.renderCard(22)}
            {this.renderCard(23)}
          </div>
        </div>
      );
  }
}

// ========================================

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
