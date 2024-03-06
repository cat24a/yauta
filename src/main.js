import Main from './Main.svelte'; // works
import "./style.css"
import "./fontawesome/css/all.css"

const app = new Main({
  target: document.body,
});

export default app;
