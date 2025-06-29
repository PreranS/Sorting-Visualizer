import { setArray } from "../reducers/array";
import { setCurrentSwappers } from "../reducers/swappers";
import { setCurrentSorted } from "../reducers/sorted";
import { setRunning } from "../reducers/running";

function insertionSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0),
      toDispatch = [];
  let n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    toDispatch.push([i, j]);
    while (j >= 0 && array[j] > key) {
      toDispatch.push([j, j + 1, true]);
      array[j + 1] = array[j];
      toDispatch.push(array.slice(0));
      toDispatch.push([]);
      j = j - 1;
      if (j >= 0) toDispatch.push([j, j + 1]);
    }
    array[j + 1] = key;
    toDispatch.push(array.slice(0));
    toDispatch.push([]);
    toDispatch.push([true, i]);
  }
  toDispatch.push([true, n - 1]);
  handleDispatch(toDispatch, dispatch, array, speed);
  return array;
}

function handleDispatch(toDispatch, dispatch, array, speed) {
  if (!toDispatch.length) {
    dispatch(setCurrentSorted(array.map((num, index) => index)));
    setTimeout(() => {
      dispatch(setCurrentSwappers([]));
      dispatch(setRunning(false));
    }, 900);
    return;
  }
  let dispatchFunction = toDispatch[0].length > 3 ?
    setArray : toDispatch[0].length === 3 || toDispatch[0].length === 0 ?
      setCurrentSwappers : toDispatch[0].length === 2 && typeof toDispatch[0][0] === "boolean" ?
        setCurrentSorted : setCurrentSwappers;
  dispatch(dispatchFunction(toDispatch.shift()));
  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed);
  }, speed);
}

export default insertionSort; 