#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const Chatopera = require('@chatopera/sdk');

program
  .version('0.0.1')
  .arguments('<clientId> <secret>')
  .action((clientId, secret) => {
    if (clientId && secret) {
      let client = new Chatopera(clientId, secret);

      let prompt = () => {
        inquirer
          .prompt({ name: 'send', message: 'Text' })
          .then(function(answers) {
            client
              .conversation('xiao', answers.send)
              .then(res => {
                console.log(res);
                console.log('Bot:', res.string);
              })
              .catch(console.error)
              .then(() => {
                prompt();
              });
          });
      };

      prompt();
    } else {
      console.error('clientId and secret is required');
    }
  })
  .parse(process.argv);
