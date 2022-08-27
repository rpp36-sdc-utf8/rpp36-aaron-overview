const app = require('./index.js');

const port = 3010;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});