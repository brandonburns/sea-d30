'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var request = require('superagent');
var constants = require('./constants');

//notes
var NoteStore = require('./notes/note_store');
var Note = require('./notes/components/note');
var NoteForm = require('./notes/components/note_form');
var NoteList = require('./notes/components/note_list');

//users and session
var UserStore = require('./users/user_store');
var Users = require('./users/components/users');

var actions = {
  addNote: function(note) {
    this.dispatch(constants.ADD_NOTE, note);
  },

  deleteNote: function(note) {
    this.dispatch(constants.REMOVE_NOTE, note);
  },

  login: function(user) {
    this.dispatch(constants.LOGIN, user);
  },

  logout: function() {
    this.dispatch(constants.LOGOUT);
  },

  createUser: function(user) {
    this.dispatch(constants.CREATE_USER, user);
  },

  getAllNotes: function() {
    this.dispatch(constants.GET_ALL_NOTES);
  }
};

var stores = {
  NoteStore: new NoteStore(),
  UserStore: new UserStore()
};

var flux = new Fluxxor.Flux(stores, actions);

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var App = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('NoteStore', 'UserStore')],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      noteData: flux.store('NoteStore').getState(),
      userData: flux.store('UserStore').getState()
    };
  },
  render: function() {
    return (
      <main>
        <Users eat={this.state.userData.eat}/>
        <NoteList data={this.state.noteData.notes} eat={this.state.userData.eat} />
        <NoteForm eat={this.state.userData.eat}/>
      </main>
    )
  }
});

React.render(<App flux={flux}/>, document.body);
