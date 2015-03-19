'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var request = require('superagent');
var baseUrl = '/api/v1/notes';
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var NoteForm = require('./NoteForm.js');
var NoteStore = require('./NoteStore.js');
var NoteList = require('./NoteList.js');

var NotesApp = React.createClass({
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

module.exports = NotesApp;