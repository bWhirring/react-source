import Hu from './lib/react';
import ReactDOM from './lib/react-dom';

function App() {
  return Hu.createElement("div", null, "Hello React");
}

ReactDOM.render(Hu.createElement(App, null), document.getElementById('root'));
