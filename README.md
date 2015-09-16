# Ember-route-layers

This [Ember CLI](http://www.ember-cli.com/) addon makes it trivial to wire up close icons and cancel buttons.

* Set the `routeLayer` property on your "escapable" routes.
* As the user navigates, `service:route-layers` maintains a route layer stack.
* The `exitRouteLayer` action takes you back to the previous level in the stack.

## Usage

Install the addon and all your routes will get an `exitRouteLayer` action and `routeLayer: 'default'`.

`ember install addon ember-route-layers`

Override the `routeLayer` property on leaf routes which are "escapable".

```
  routeLayer: 'edit-post',
```

Now we’re ready to go.

```
<button {{ action 'exitRouteLayer' }}>Cancel</button>
```

Using [ember-responds-to](https://github.com/dollarshaveclub/ember-responds-to) for escape key support,

```
escKeypress: function () {
  this.send('exitRouteLayer');
}
```

## Notes

In your routes, set `routeLayer` to a string identifying a group of related routes which form a navigational "layer" (i.e. the close button behavior is not affected by navigation between them). This often corresponds to what designers call a "flow", though it can be more of a "context" if the navigation is not linear. Leave all your "ground floor" pages (with no close icon or cancel button) with `routeLayer: 'default'` (which is set by default).

* The leaf node sets the route layer.
* We use the `afterModel` hook, so don’t forget to call `this._super`.
* Aborted transitions are ignored.
* The `exitRouteLayerFallback` action may be overridden to control what happens when a user directly loads and then exits a non-default route layer.
* Navigating to a route layer which is already in the stack will take you back down to that layer.
