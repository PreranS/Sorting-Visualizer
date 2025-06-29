import React, { Component } from "react";
import "./Body.css";

class Body extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      array,
      currentBubbleTwo,
      currentQuickTwo,
      pivot,
      currentSwappers,
      currentHeapThree,
      currentSorted,
      currentMergeX,
    } = this.props;

    const numWidth = Math.floor(window.innerWidth / (array.length * 3));
    const width = `${numWidth}px`;
    const numMargin = array.length < 5 ?
      10 : array.length < 8 ?
        8 : array.length < 11 ?
          6 : array.length < 20 ?
            4 : array.length < 50 ?
              3.5 : array.length < 100 ?
                3 : array.length < 130 ?
                  2.5 : 2;
    const margin = `${numMargin}px`;
    const color = numWidth > 20 ? "white" : "transparent";
    const numFont = numWidth > 70 ?
      20 : numWidth > 60 ?
        18 : numWidth > 50 ?
          16 : numWidth > 40 ?
            14 : numWidth > 30 ?
              12 : numWidth > 20 ?
                10 : 8;
    const fontSize = `${numFont}px`

    return (
      <div id="bodyContainer" role="region" aria-label="Sorting Visualization">
        { array.length ? array.map((number, index) => {
          let barClass = "arrayElement ";
          if (currentSwappers.includes(index)) barClass += "swapper ";
          else if (currentBubbleTwo.includes(index) || currentQuickTwo.includes(index) || currentHeapThree.includes(index) || currentMergeX.includes(index)) barClass += "active ";
          else if (pivot === index) barClass += "pivot ";
          else if (currentSorted.includes(index)) barClass += "sorted ";
          else barClass += "defaultBar ";
          return <div
            className={barClass}
            key={index}
            style={{height: `${number * 3}px`, width: width, marginLeft: margin, marginRight: margin, color: color, fontSize: fontSize}}
            aria-label={`Array value ${number}`}
            title={`Value: ${number}`}
          >
            {number}
          </div>
        }) : null
        }
      </div>
    )
  }
}

export default Body;
