// Write a function that takes in an array of integers and returns an array of length 2 representing the largest range of integers contained in an array.
// The first number in the output array should be the first number in the rande, while the second number should be the last number in the range. 
// A range of numbers is defined as a set of numbers that come right after each other in the set of real integers. For instance, the output array [2, 6] represents the range {2, 3, 4, 5, 6}, which is a range of length 5. Note that numbers don't need to be sorted or adjacent in the input array in order to form a range. You can assume that there will only be one largest range. 

// Sample input: array = [1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6]
// Sample output: [0, 7]

//Naive approach: We can sort the array in ascending order and then loop through the array to keep track of the largest range given that adjacent values are consecutive. However, we can do better than this in terms of runtime. We can do this by using a hashtable. 

// hash = {1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6}

//By using a hash table, we can check if values in our input array are in the hash table. Starting with 1, we can check if that number is in the table. Since it is, we can check if it's adjacents are present in the table. We start with 1 - 1, which is 1's left-adjacent number, the number 0. The number 0 is in the table, so we then check is 0 - 1 is in the hash table, which it's not. We then start traversing to the right, adding 0 + 1. Since 1 is already in the table, we check for 1 + 1, which indeed is in the table. Since 2 is in the table, we check 3 and so on. When we reach a number that is not on the table, we can store the length of that range within the output array. This process continues until we've looped through the entire array. We can then return the output array which will have continued to update through the loop, finally returning the largest range. 

//The more optimized approach uses the power of key/value pairs within a hash table. We can set all the numbers to "true" boolean, representing that when we loop through the array, these numbers are good to be compared/check against the array. Once you iterate the array, we can set that same number to "false", so that we know this number has already been compared/checked and we don't need to do it again. By cutting down on the operations to be done, by using these booleans values, we can achieve a linear runtime O(n). By comparison, the first approach of sorting and comparing to the hashtable in a loop, this would require a O(nLog(n)) runtime, which is definitely less efficient than the second approach. 

//The space complexity of this algorithm is O(n) given the size of the array, which it's "n" number values will be stored in a hash table.

function largestRange(array) {
  let hashNumIdx = {};
  let largestRange = [-1, -1];
  let largestRangeLength = -Infinity;

  array.forEach((num, index) => {
    hashNumIdx[num] = index;
  })

  array.forEach((num, index) => {
    if(hashNumIdx[num] >= 0) {
      const [lowest, highest] = getLowestAndHighestRangeFrom(num, hashNumIdx);
      const currentRangeLength = highest - lowest;
      if(currentRangeLength > largestRangeLength) {
        largestRangeLength = currentRangeLength;
        largestRange = [lowest, highest];
      }
    }
  })

  return largestRange;
}

function getLowestAndHighestRangeFrom(num, hashNumIdx) {
  hashNumIdx[num] = -1;

  let range = [num, num];
  let currentLow = num - 1;
  let currentHigh = num + 1;

  while(currentLow in hashNumIdx && hashNumIdx[currentLow] > 0) {
    range[0] = currentLow;
    hashNumIdx[currentLow] = -1;
    currentLow = currentLow - 1;
  }

  while(currentHigh in hashNumIdx && hashNumIdx[currentHigh] > 0) {
    range[1] = currentHigh;
    hashNumIdx[currentHigh] = -1;
    currentHigh = currentHigh + 1;
  }
  return range;
}