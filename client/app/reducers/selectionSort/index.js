const initialState = [];

export default function setCurrentSelectionSort(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT_SWAPPERS":
      return action.payload;
    default:
      return state;
  }
} 