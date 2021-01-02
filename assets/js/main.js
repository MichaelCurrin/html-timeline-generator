import { h, render } from 'https://unpkg.com/preact?module';

const app = h('h1', null, 'Hello World!');

render(app, document.body);
