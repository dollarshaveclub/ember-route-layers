# Ember-route-layers

[![Greenkeeper badge](https://badges.greenkeeper.io/dollarshaveclub/ember-route-layers.svg)](https://greenkeeper.io/)
[![Ember Observer Score](http://emberobserver.com/badges/ember-route-layers.svg)](http://emberobserver.com/addons/ember-route-layers)
[![Build Status](https://travis-ci.org/dollarshaveclub/ember-route-layers.svg?branch=master)](https://travis-ci.org/dollarshaveclub/ember-route-layers)
[![Coverage Status](https://coveralls.io/repos/github/dollarshaveclub/ember-route-layers/badge.svg?branch=master)](https://coveralls.io/github/dollarshaveclub/ember-route-layers?branch=master)

Ember Route Layers is used to group routes together and navigate back to past route groups. Its stack of route layers is like a dynamic breadcrumb trail to power your "back" function (e.g. link that says "back", escape key, close icon or cancel button).

For example, take a site where you can get to a set of account pages from anywhere on the site. Grouping these into an "account" route layer lets you click around within the account routes and still have a "back" link which takes you back to wherever you were before you went to your account.

## Example: Hierarchical Store + Account and Cart sections

<pre>

Route                                    Layer
---------------------------------------- ------------
* Index ................................ default
* About ................................ default
* Contact .............................. default
* Account
  * Index .............................. account
  * Billing
    * Index ............................ account
    * Edit ............................. edit-billing
  * Password ........................... account
  * Shipping ........................... account
* Cart
  * Index .............................. cart
  * History ............................ cart
  * Checkout
    * Index ............................ cart
    * Success .......................... cart
* Store
  * Index .............................. default
  * Books
    * Index ............................ category
    * Fiction .......................... subcategory
    * Non-Fiction ...................... subcategory
  * Comics
    * Index ............................ category
    * Anime ............................ subcategory
    * DC ............................... subcategory
    * Marvel ........................... subcategory
  * Magazines
    * Index ............................ category
    * Fashion .......................... subcategory
    * Kardashian ....................... subcategory

</pre>

From anywhere on the site, I can go to my account. When I navigate around the account section and then click "back", I want to go wherever I was before I went to the account section: maybe the cart, the store index or a subsection.

From anywhere in the store, if I go to my cart and checkout, exiting takes me back to where I was in the store.

The above example also supports hierarchical navigation within the store: if I go Store > Comics > DC > Marvel, exiting route layers will take me back to Comics and then back to Store.

Ember Route Layers really shines when various different flows use the same route. If I edit billing from the account billing page, exit takes me back to my account page. But if I edit billing during the checkout process, exit will take me back to checkout.

## Usage

* Set the `routeLayer` property on your "escapable" routes.
* As the user navigates, `service:route-layers` maintains a route layer stack.
* The `exitRouteLayer` action takes you back to the previous level in the stack.

Install the addon and all your routes will get an `exitRouteLayer` action and `routeLayer: 'default'`.

```
  ember install ember-route-layers
```

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
