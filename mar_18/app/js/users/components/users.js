'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var UsersForm = require('./users_form');

var Users = React.createClass({
  mixins: [FluxMixin],
  handleLogout: function(e) {
    e.preventDefault();

    this.getFlux().actions.logout();
  },

  render: function() {
    if (this.props.eat)
      this.getFlux().actions.getAllNotes();
    var users;
    if (this.props.eat) 
      users = <a href onClick={this.handleLogout}>Log Out</a>;
    else
      users = <UsersForm />;
    return (
      <section>
        {users}
      </section>
    )
  } 
});

module.exports = Users;
