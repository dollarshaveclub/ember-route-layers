This addon makes it trivial to wire up close icons and cancel buttons to navigate back out of routes which have a nested relationship from the user's perspective.

In your routes, set `routeLayer` to a string identifying a group of related routes which form a navigational "layer" (i.e. the close button behavior is not affected by navigation between them). This often corresponds to what designers call a "flow", though it can be more of a "context" if the navigation is not unidirectional. Leave all your "ground floor" pages (with no close icon or cancel button) with `routeLayer: 'default'` (which is set by default).

Then just `this.send('exitRouteLayer')` when you want to go back to where you were before you entered this route layer.


# Ember-route-layers

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
