import React from 'react';
import renderer from 'react-test-renderer';
import Body from './Body';

test('renders Body', () => {
  const mockArray = [1, 2, 3, 4, 5];
  const mockProps = {
    array: mockArray,
    currentSwappers: [],
    currentBubbleTwo: [],
    currentQuickTwo: [],
    currentHeapThree: [],
    currentMergeX: [],
    pivot: null,
    currentSorted: [],
  };
  const tree = renderer.create(<Body {...mockProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});