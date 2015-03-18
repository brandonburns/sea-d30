'use strict';

var Fluxxor = require('fluxxor');
var baseUrl = 'api/v1/notes';
var constants = require('../constants');
var request = require('superagent');
var Cookies = require('cookies-js');

var NoteStore = Fluxxor.createStore({
  initialize: function() {
    this.notes = [];

    this.bindActions(
      constants.ADD_NOTE, this.onNewNote,
      constants.REMOVE_NOTE, this.onRemoveNote,
      constants.GET_ALL_NOTES, this.getAll
    );
    this.getAll();
  },

  getAll: function() {
   request
      .get(baseUrl)
      .set('eat', Cookies.get('eat'))
      .end(function(err, res) {
        if (err) return console.log(err);

        this.notes = res.body;
        this.emit('change');
      }.bind(this));
  },

  onNewNote: function(note) {
    request
      .post(baseUrl)
      .set('eat', Cookies.get('eat'))
      .send(note)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.notes.push(res.body);
        this.emit('change');
      }.bind(this));
  },

  onRemoveNote: function(note) {
    request
      .del(baseUrl + '/' + note._id)
      .set('eat', Cookies.get('eat'))
      .end(function(err, res) {
        if (err) return console.log(err);

        this.notes.splice(this.notes.indexOf(note), 1);
        this.emit('change');
      }.bind(this));
  },

  getState: function() {
    return {notes: this.notes};
  }
});

module.exports = NoteStore;
