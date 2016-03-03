import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      title: 'My Post',
      content: `Disrupt knausgaard whatever, four loko try-hard chartreuse waistcoat portland vegan kale chips bushwick green juice tumblr. Flexitarian paleo keytar typewriter hashtag, four loko swag. Gentrify etsy fanny pack literally skateboard, man bun pickled cold-pressed brunch you probably haven't heard of them asymmetrical single-origin coffee shoreditch. Hashtag plaid mlkshk pickled ethical. Affogato taxidermy forage, gastropub hella letterpress actually you probably haven't heard of them VHS. Next level messenger bag pitchfork readymade. Master cleanse fap williamsburg gochujang, flexitarian deep v hashtag venmo green juice cray polaroid pop-up tacos.`
    };
  }
});
