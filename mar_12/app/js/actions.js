'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var request = require('superagent');
var FluxMixin = Fluxxor.FluxMixin(React);
var constants = require('./constants');

var actions = {
  addNote: function(note) {
    this.dispatch(constants.ADD_NOTE, note);
  },

  deleteNote: function(note) {
    this.dispatch(constants.REMOVE_NOTE, note);
  }
};

module.exports = actions;