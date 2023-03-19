/**
 * function initializes seats layout matrix
 * @param airplaneLayout 2D array like [[1,2],[3,6],[2,3],[5,4]]
 * @returns object object contains seatsMatrix which is a 3D array represents the actual airplane seats, and maxRowsNum which is max number of rows
 */
const buildSeatsMatrix = (airplaneLayout) => {
  let seatsMatrix = [];
  let maxRowsNum = 0;
  airplaneLayout.forEach((section) => {
    let sectionMatrix = [];
    for (let i = 0; i < section[1]; i++) {
      // row by row
      let sectionRow = [];
      maxRowsNum = section[1] > maxRowsNum ? section[1] : maxRowsNum;
      for (let j = 0; j < section[0]; j++) {
        // column by column
        sectionRow.push(0);
      }
      sectionMatrix.push(sectionRow);
    }
    seatsMatrix.push(sectionMatrix);
  });
  return { seatsMatrix, maxRowsNum };
};

/**
 * function prints airplane seats matrix
 * @param seatsMatrix 3D array represents the actual airplane seats
 */
const printSeatsLayout = (seatsMatrix) => {
  seatsMatrix.forEach((section) => {
    console.log("============================================================");
    section.forEach((row) => {
      console.log(row);
      console.log(
        "------------------------------------------------------------"
      );
    });
  });
};

module.exports = {
  buildSeatsMatrix,
  printSeatsLayout,
};
