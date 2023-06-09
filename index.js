const utils = require("./utils");

/**
 * function distributes the passengers among the seats
 * @param seatsMatrix 3D array represents the actual airplane seats
 * @param maxRowsNum a number represents max number of rows in the layout
 * @param passengers a number represents passengers count
 * @returns seatsMatrix 3D array represents the actual airplane seats after distribution
 */
const distributeSeats = (seatsMatrix, maxRowsNum, passengers) => {
  let currentPassengerId = 0;
  // first run, complete the aisle seats
  for (let rowIndex = 0; rowIndex < maxRowsNum; rowIndex++) {
    // iterate over the layout row by row
    seatsMatrix.forEach((section, sectionIndex) => {
      if (currentPassengerId >= passengers)
        // all passengers are distributed
        return seatsMatrix;
      if (rowIndex < section.length) {
        // this section is not finished before this row
        const colsNum = section[rowIndex].length;
        if (sectionIndex === 0) {
          // most left section
          if (colsNum - 1 > 0) {
            // most right column (aisle)
            seatsMatrix[sectionIndex][rowIndex][colsNum - 1] =
              ++currentPassengerId;
          }
        } else if (sectionIndex === seatsMatrix.length - 1) {
          // most right section
          if (colsNum > 1) {
            // most left column (aisle)
            seatsMatrix[sectionIndex][rowIndex][0] = ++currentPassengerId;
          }
        } else {
          // a center section.
          if (colsNum > 0) {
            // (aisle)
            seatsMatrix[sectionIndex][rowIndex][0] = ++currentPassengerId;
          }
          if (colsNum - 1 > 0) {
            // (aisle)
            seatsMatrix[sectionIndex][rowIndex][colsNum - 1] =
              ++currentPassengerId;
          }
        }
      }
    });
  }
  // second run, complete the window seats
  for (let rowIndex = 0; rowIndex < maxRowsNum; rowIndex++) {
    // iterate over the layout row by row
    seatsMatrix.forEach((section, sectionIndex) => {
      if (currentPassengerId >= passengers)
        // all passengers are distributed
        return seatsMatrix;
      if (rowIndex < section.length) {
        // this section is not finished before this row
        const colsNum = section[rowIndex].length;
        if (sectionIndex === 0) {
          // most left section
          if (colsNum > 0) {
            // most right column (window)
            seatsMatrix[sectionIndex][rowIndex][0] = ++currentPassengerId;
          }
        } else if (sectionIndex === seatsMatrix.length - 1) {
          // most right section
          if (colsNum > 0) {
            // most left column (aisle)
            seatsMatrix[sectionIndex][rowIndex][colsNum - 1] =
              ++currentPassengerId;
          }
        }
      }
    });
  }
  // third run, complete the center seats
  for (let rowIndex = 0; rowIndex < maxRowsNum; rowIndex++) {
    // iterate over the layout row by row
    seatsMatrix.forEach((section, sectionIndex) => {
      if (rowIndex < section.length) {
        // this section is not finished before this row
        const colsNum = section[rowIndex].length;
        for (let col = 1; col < colsNum - 1; col++) {
          // iterate through this part of the section
          if (currentPassengerId >= passengers)
            // all passengers are distributed
            return seatsMatrix;
          // center seats
          seatsMatrix[sectionIndex][rowIndex][col] = ++currentPassengerId;
        }
      }
    });
  }
  return seatsMatrix;
};

/**
 * function handles all the logic for the seating algorithm
 */
const startSeatingAlgorithm = () => {
  const args = process.argv;
  if (args.length < 4) {
    console.error(
      'Please run the script in the following format: node index.js "[[1,2],[3,6],[2,3],[5,4]]" "30"'
    );
    process.exit(1);
  }
  try {
    const airplaneLayout = JSON.parse(args[2]); // take the 2D input array of the airplane layout
    const passengers = parseInt(args[3]); // passengers count
    if (typeof passengers !== "number" || isNaN(passengers)) {
      console.error(`Passengers count is not a number!`);
      process.exit(1);
    }
    let { seatsMatrix, maxRowsNum } = utils.buildSeatsMatrix(airplaneLayout);
    seatsMatrix = distributeSeats(seatsMatrix, maxRowsNum, passengers);
    utils.printSeatsLayout(seatsMatrix);
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(
        `Seat layout is invalid, please run the script in the following format: node index.js "[[3,2],[4,3],[2,3],[3,4]]" "30"!`
      );
    } else {
      console.error(error);
    }
    process.exit(1);
  }
};

startSeatingAlgorithm();
