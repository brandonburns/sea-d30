'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var request = require('superagent');
var baseUrl = '/api/v1/notes';

var constants = require('./constants.js');
var NoteList = require('./NoteList.js');
var NoteForm = require('./NoteForm.js');
var NoteStore = require('./NoteStore.js');
var actions = require('./actions.js');
var Note = require('./Note.js');
var NotesApp = require('./NotesApp.js');

var stores = {
  NoteStore: new NoteStore()
};

var flux = new Fluxxor.Flux(stores, actions);
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

React.render(<NotesApp flux={flux}/>, document.body);
