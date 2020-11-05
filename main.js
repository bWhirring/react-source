import Hu from './lib/react';
import { render } from './lib/react-dom';

function App() {
  return Hu.createElement("div", null, "Hello React");
}

render(Hu.createElement(App, null), document.getElementById('root'));
