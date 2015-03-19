'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var request = require('superagent');
var baseUrl = '/api/v1/notes';
var FluxMixin = Fluxxor.FluxMixin(React);

var Note = React.createClass({
  mixins: [FluxMixin],
  handleDelete: function() {
    this.getFlux().actions.deleteNote(this.props.data);
  },
  render: function() {
    return <li><span>{this.props.data.author + ': '}</span>{this.props.data.noteBody}<button onClick={this.handleDelete}>Delete</button></li>
  }
});

module.exports = Note;