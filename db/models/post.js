'use strict';
var Sequelize = require('sequelize')
var db = require('APP/db')

module.exports = db.define('posts', {
  content: Sequelize.STRING,
  date:{
    type: Sequelize.DATE ,
    defaultValue: Sequelize.Now
  }
})
