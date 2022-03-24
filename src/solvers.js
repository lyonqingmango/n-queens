/*           _
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
  //放置1个旗子，第二个方式和
  // var solution = []; //fixme
  var board = new Board({'n': n });
  var solution = [];

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      board.togglePiece(i, j);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
      }

    }

    solution.push(board.get(i));
  }



  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({'n': n });
  var solutionCount = 0; //fixme

  if (n === 1) {
    solutionCount = 1;

  }
  if (n === 2) {
    solutionCount = 2;
  }
  if (n > 2) {
    solutionCount = countNRooksSolutions(n - 1) * n;
  }



  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({'n': n });
  var solution;
  var row = 0;
  if (n === 2 || n === 3) {
    return board.rows();
  }

  var helper = function(row, n, board) {
    if (row === n ) {
    // console.log(board.rows() + 'lastrows');
      solution = board.rows();
      return;
    }

    for (let i = 0; i < n; i++) { //col
      board.togglePiece(row, i);
      if (board.hasAnyQueenConflictsOn(row, i)) {
        board.togglePiece(row, i);
      } else {
      // console.log(board.rows() + '2rows');
        helper(row + 1, n, board);
        if (solution) {
          break;
        }
        board.togglePiece(row, i);
      }


    }
  };

  helper(0, n, board);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;



};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var res = [];
  var solution = [];
  var board = new Board({'n': n });
  console.log('n' + n);
  if (n === 0) {
    solutionCount = 1;
    console.log('Number of solutions for ' + n + ' queens:', solutionCount);
    return solutionCount;
  }



  if ( n === 2 || n === 3) {
    console.log('Number of solutions for ' + n + ' queens:', solutionCount);
    return 0;
  }

  var helper = function(row, n) {
    if (row === n) {

      // const copy = solution.slice();
      // console.log(copy + 'solution');
      // res.push(copy);
      // console.log('res ' + res);
      solutionCount++;
      return;
    }

    for (let i = 0; i < n; i++) { //col
      board.togglePiece(row, i);
      if (board.hasAnyQueenConflictsOn(row, i)) {
        board.togglePiece(row, i);

      } else {
      // console.log(board.rows() + '2rows');
        // solution.push(board.get(row));
        helper(row + 1, n);//dfs
        board.get(row)[i] = 0;
        // solution.pop();

      }

    }
  };

  helper(0, n);
  // console.log('resfinal ' + res);
  // solutionCount = res.length;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
