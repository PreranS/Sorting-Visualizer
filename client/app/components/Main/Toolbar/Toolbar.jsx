import React, { Component } from "react";
import "./Toolbar.css";

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { generateArray } = this.props;

    generateArray(87);
    document.getElementById("changeSize").value = 50;
  }

  handleClick(algorithm) {
    const { updateAlgorithm } = this.props;

    updateAlgorithm(algorithm);
  }

  handleChange(evt) {
    const { generateArray } = this.props;

    generateArray(Math.floor((parseInt(evt.target.value) + 3) * 1.65));
  }

  render() {
    const {
      array,
      algorithm,
      generateArray,
      sort,
      isRunning,
    } = this.props;

    const speed = 570 - Math.pow(array.length, 2) > 0 ?
      570 - Math.pow(array.length, 2) : 0;

    const color = isRunning ? "rgba(214, 29, 29, 0.8)" : "white";
    const cursor = isRunning ? "auto" : "pointer";

    const complexities = {
      bubbleSort: {
        name: 'Bubble Sort',
        time: 'O(n²)',
        space: 'O(1)'
      },
      selectionSort: {
        name: 'Selection Sort',
        time: 'O(n²)',
        space: 'O(1)'
      },
      insertionSort: {
        name: 'Insertion Sort',
        time: 'O(n²)',
        space: 'O(1)'
      },
      mergeSort: {
        name: 'Merge Sort',
        time: 'O(n log n)',
        space: 'O(n)'
      },
      quickSort: {
        name: 'Quick Sort',
        time: 'O(n log n)',
        space: 'O(log n)'
      },
      heapSort: {
        name: 'Heap Sort',
        time: 'O(n log n)',
        space: 'O(1)'
      },
    };
    const currentComplexity = complexities[algorithm] || null;

    return (
      <nav id="toolbar" role="toolbar" aria-label="Sorting Controls">
        <button
          id={!isRunning ? "generateArray" : "generateArrayX"}
          style={{color: color, cursor: cursor}}
          onClick={!isRunning ? () => generateArray(array.length) : null}
          disabled={isRunning}
          aria-label="Generate New Array"
          title="Generate a new random array"
        >
          Generate New Array
        </button>
        <div className="separator" aria-hidden="true"></div>
        <label id="arraySize" htmlFor="changeSize" style={{color: color}}>
          Change Array Size & Sorting Speed
        </label>
        <input
          id="changeSize"
          type="range"
          min="0"
          max="100"
          style={{background: color, cursor: cursor}}
          disabled={isRunning}
          onChange={this.handleChange}
          aria-label="Change array size and sorting speed"
        />
        <span className="helper-text" style={{marginLeft: '8px', color: '#ccc', fontSize: '12px'}}>
          (Left: Fewer, slower | Right: More, faster)
        </span>
        <div className="separator" aria-hidden="true"></div>
        <button
          className={algorithm === "mergeSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("mergeSort")}
          disabled={isRunning}
          aria-label="Select Merge Sort"
          title="Use Merge Sort algorithm"
        >
          Merge Sort
        </button>
        <button
          className={algorithm === "quickSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("quickSort")}
          disabled={isRunning}
          aria-label="Select Quick Sort"
          title="Use Quick Sort algorithm"
        >
          Quick Sort
        </button>
        <button
          className={algorithm === "heapSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("heapSort")}
          disabled={isRunning}
          aria-label="Select Heap Sort"
          title="Use Heap Sort algorithm"
        >
          Heap Sort
        </button>
        <button
          className={algorithm === "bubbleSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("bubbleSort")}
          disabled={isRunning}
          aria-label="Select Bubble Sort"
          title="Use Bubble Sort algorithm"
        >
          Bubble Sort
        </button>
        <button
          className={algorithm === "selectionSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("selectionSort")}
          disabled={isRunning}
          aria-label="Select Selection Sort"
          title="Use Selection Sort algorithm"
        >
          Selection Sort
        </button>
        <button
          className={algorithm === "insertionSort" ? "currentAlgorithmButton" : "algorithmButton"}
          onClick={() => this.handleClick("insertionSort")}
          disabled={isRunning}
          aria-label="Select Insertion Sort"
          title="Use Insertion Sort algorithm"
        >
          Insertion Sort
        </button>
        <div className="separator" aria-hidden="true"></div>
        { algorithm ? <button
            id="sort"
            style={{color: color, cursor: cursor}}
            onClick={!isRunning ? () => sort(algorithm, array, speed) : null}
            disabled={isRunning}
            aria-label="Sort the array"
            title="Start sorting the array"
          >
            {isRunning ? 'Sorting...' : 'Sort!'}
          </button> : null
        }
        { algorithm && currentComplexity && (
          <div className={`complexity-info${isRunning ? ' running' : ''}`}>
            <strong>{currentComplexity.name} Complexity:</strong><br/>
            Time: <span>{currentComplexity.time}</span> &nbsp;|&nbsp; Space: <span>{currentComplexity.space}</span>
          </div>
        )}
      </nav>
    )
  }
}

export default Toolbar;
