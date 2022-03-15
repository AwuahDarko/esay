const database = require('../config/mysql')

const util = require('util');

  exports.promisifiedMySql = function () {
  
    return {
      query( sql, args ) {
        return util.promisify( database.query ).call( database, sql, args );
      }
    };
  }

