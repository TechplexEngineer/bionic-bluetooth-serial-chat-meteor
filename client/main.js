import { Meteor } from 'meteor/meteor';

// import Bs from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import App from '../imports/ui/App.svelte';


Meteor.startup(() => {
  new App({
    target: document.getElementById('app')
  });
});