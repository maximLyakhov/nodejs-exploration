const { exec } = require('child_process')

// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('How many requests is needed to be sent?\n', (numberOfRequests) => {
//   const command = `loadtest -n ${numberOfRequests} -c 1000 -k http://localhost:3000/ppp`;
//   exec(command, (error, stdout, stderr) => {
//     if (stderr) console.error(stderr);
//     if (error) console.error(error);
//     console.log(stdout);
//   });
//   rl.close();
// })

const command = 'autocannon -c 16 -w 8 -l http://localhost:3000/'
exec(command, (error, stdout, stderr) => {
  if (stderr) console.error(stderr)
  if (error) console.error(error)
  console.log(stdout)
})
