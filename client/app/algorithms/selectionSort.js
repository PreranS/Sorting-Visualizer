import { setArray } from "../reducers/array";
import { setCurrentSwappers } from "../reducers/swappers";
import { setCurrentSorted } from "../reducers/sorted";
import { setRunning } from "../reducers/running";

function selectionSort(stateArray, dispatch, speed) {
  let array = stateArray.slice(0),
      toDispatch = [];
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      toDispatch.push([minIdx, j]);
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      toDispatch.push([i, minIdx, true]);
      let temp = array[i];
      array[i] = array[minIdx];
      array[minIdx] = temp;
      toDispatch.push(array.slice(0));
      toDispatch.push([]);
    }
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

export default selectionSort; 