/**
 * function initializes seats layout matrix
 * @param airplaneLayout 2D array like [[1,2],[3,6],[2,3],[5,4]]
 * @returns object object contains seatsMatrix which is a 3D array represents the actual airplane seats, and maxRowSize which is max number of rows
 */
const buildSeatsMatrix = (airplaneLayout) => {
  let seatsMatrix = [];
  let maxRowSize = 0;
  airplaneLayout.forEach((section) => {
    let sectionMatrix = [];
    for (let i = 0; i < section[1]; i++) {
      // row by row
      let sectionRow = [];
      maxRowSize = section[1] > maxRowSize ? section[1] : maxRowSize;
      for (let j = 0; j < section[0]; j++) {
        // column by column
        sectionRow.push(0);
      }
      sectionMatrix.push(sectionRow);
    }
    seatsMatrix.push(sectionMatrix);
  });
  return { seatsMatrix, maxRowSize };
};

/**
 * function distributes the passengers among the seats
 * @param seatsMatrix 3D array represents the actual airplane seats
 * @param maxRowSize a number represents max number of rows in the layout
 * @param passengers a number represents passengers count
 * @returns seatsMatrix 3D array represents the actual airplane seats after distribution
 */
const distributeSeats = (seatsMatrix, maxRowSize, passengers) => {
  // first run, complete the aisle seats
  // second run, complete the window seats
  // third run, complete the center seats
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
      throw new TypeError();
    }
    let { seatsMatrix, maxRowSize } = buildSeatsMatrix(airplaneLayout);
    seatsMatrix = distributeSeats(seatsMatrix, maxRowSize, passengers);
    //printSeatsLayout(seatsMatrix);
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(
        `Seat layout is invalid, please run the script in the following format: node index.js "[[1,2],[3,6],[2,3],[5,4]]" "30"!`
      );
    } else if (error instanceof TypeError) {
      console.error(`Passengers count is not a number!`);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
};

startSeatingAlgorithm();
