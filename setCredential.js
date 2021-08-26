const keytar = require('keytar');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Please input author name and password: ', (x) => {
  const inputs = x.split(' ');
  // TODO: service name get from config
  keytar.setPassword('qualtet', inputs[0], inputs[1]);
  readline.close();
});
