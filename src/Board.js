// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({
    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        // console.log('this' + this);
        // console.log('rows' + this.get(rowIndex));
        return this.get(rowIndex);
      }, this);
    }, //每一行的值，0，0，0，0，如果n为4； 打印四次

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // var rowsarr=this.rows();
      let arrRow = this.get(rowIndex);
      let count = 0;
      // console.log('arr' + arrRow);
      for (let i = 0; i < arrRow.length; i++) {
        if (arrRow[i] === 1) {
          count++;

        }

      }
      if (count > 1) {
        return true;
      } else {
        return false;
      }
      // fixme
    },



    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let numRows = this.get('n');//lenth;
      for (let j = 0; j < numRows; j++) {
        if (this.hasRowConflictAt(j)) {
          return true;
        }
      }

      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let length = this.get('n');
      let count = 0;


      for (let i = 0; i < length; i++) {
        if (this.get(i)[colIndex] === 1) {
          count++;

        }

      }
      if (count > 1) {
        return true;
      } else {
        return false;
      }
      // fixme // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var numCol = this.get('n');//lenth;
      for (let j = 0; j < numCol; j++) {
        if (this.hasColConflictAt(j)) {
          return true;
        }
      }

      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {


      var countMajor = 0;
      for (let i = 0; i < this.get('n'); i++) {
        var colIndex = majorDiagonalColumnIndexAtFirstRow + i;
        if (this.get(i)[colIndex] === 1) {
          countMajor++;
        }
      }
      if (countMajor > 1) {
        return true;
      } else {
        return false;

      }

      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let length = this.get('n');
      for (i = -length + 1; i < length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }

      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // let numRows = this.get('n');
      let count = 0;
      for (let i = 0; i < this.get('n'); i++ ) {
        var checkColIndex = minorDiagonalColumnIndexAtFirstRow - i;

        var checknum = this.get(i)[checkColIndex];
        if (checknum === 1) {
          count++;
        }

      }
      if (count > 1) {
        return true;
      } else {
        return false;
      }

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var length = this.get('n') * 2 - 1;
      for (let i = 0; i < length; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }
    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };


}());


// n_queen {
//   arr1 = []
//   arr2 = []
//   arr3 = []
//   arr4 = []


//   // when to exit

//   // backtrack
//   for (... ) {

//   invalid -> continue; // check mark

//   operation // mark col, row, dia, dia2: arr1[0] = true, arr2[1] = false, lll

//   n_queen()
//   remove_operation // reverse mark

// }


// }