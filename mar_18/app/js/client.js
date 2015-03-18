'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var request = require('superagent');
var constants = require('constants');

//notes
var NoteStore = require('./notes/note_store');
var Note = require('./notes/components/note');
var NoteForm = require('./notes/components/note_form');
var NoteList = require('./notes/components/note_list');

var actions = {
  addNote: function(note) {
    this.dispatch(constants.ADD_NOTE, note);
  },

  deleteNote: function(note) {
    this.dispatch(constants.REMOVE_NOTE, note);
  }
};

var stores = {
  NoteStore: new NoteStore()
};

var flux = new Fluxxor.Flux(stores, actions);

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var App = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('NoteStore')],

  getStateFromFlux: function() {
    return this.getFlux().store('NoteStore').getState();
  },
  render: function() {
    return (
      <main>
        <NoteForm />
        <NoteList data={this.state.notes} />
      </main>
    )
  }
});

React.render(<App flux={flux}/>, document.body);
