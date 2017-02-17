  /* 'anything'
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other




window.findNRooksSolution = function(n) {

  var solution = [];
  var board = new Board({n: n});
  var rowIndex = 0;
  var length = n;
  var placed = 0;

  var placeRooks = function(n, rowIndex) {

  // if n is zero, you've hit the base case. end subroutine.
    if (n === 0) {

      return;
    }

  //get row with rowIndex
    var row = board.get(rowIndex);

  //iterate through each box in a row.
    for (var column = 0; column < length; column++) {

    //toggle a piece.
      if (column === rowIndex) {
        board.togglePiece(rowIndex, column);
        solution.push(row);
        console.log('n: ' + n + ', and placed: ' + placed + ', last rook placed at: ' + row);
        n--;
      }
    }
    placeRooks(n, ++rowIndex);
  };

  placeRooks(n, 0);
  // return solution;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
  //O(1);
};



//recursion step: call subroutine with n-- and rowindex++

// for last rook, out of subroutine, look for conflicts. if one, then that position will be zero.

//ultimately push the row into the solution.
//return solution.

//1.  Generate all possible board combinations
//2.  Loop through them and apply both of our tests
//.  append result with 1) first example of a board with no conflits
//   count of all the boards that have no conflicts.

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = undefined; //fixme
  var factorial = function(num) {
    if(num === 0){
      return 1;
    }
    return num * factorial(num - 1);
  };

  var solutionCount = factorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
  //O(n)
};

window.findSolution = function(row, n, board, validator, callback) {
  // if all rows exhausted, this is a valid solution.
  if (row === n) {
    return callback();
  }
  for (var i = 0; i < n; i++) {
    board.togglePiece(row, i);
    if (!board[validator]()) {
      var result = findSolution(row + 1, n, board, validator, callback);
      if (result) {
        return result;
      }
    }
    board.togglePiece(row, i);
  }
  //O(n!)
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var board = new Board({n: n});
  var solution = findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  });

  solution = solution || board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
  //TIME COMPLEXITY O(n!)
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other



window.countNQueensSolutions = function(n) {

  var board = new Board({n: n});

  var solutionCount = 0;

  findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    solutionCount++;
    console.log(solutionCount);
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
  //TIME COMPLEXITY: EXPONENTIAL
};

//TIME COMXITY O(e^n)