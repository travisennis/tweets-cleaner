'use strict'

const fs = require('fs')
const chalk = require('chalk')
const lazy = new require('lazy')
const twitter = require('twitter')

const config = require('./config')

let i = 0
let maxDate = new Date(config.maxDate)

var client = new twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
})

lazy(fs.createReadStream(config.path))
  .lines
  .map(l => l.toString().replace(/"/g, '').split(','))
  .filter(l => !isNaN(parseInt(l[0])) && (new Date(l[3]) < maxDate))
  .join(tweets => {
    deleteTweet(tweets, 0)
  })

function deleteTweet(tweets, i) {
  let next = config.callsInterval, remaining = 0

  console.log(Date.now())

  client.post(`statuses/destroy/${tweets[i][0]}`, {}, function (err, t, res) {
    remaining = parseInt(res.headers['x-rate-limit-remaining'])

    if (!isNaN(remaining) && remaining == 0) {
      console.log(chalk.cyan(`Waiting`))
      next = parseInt(res.headers['x-rate-limit-reset']) - Date.now()
    } else {
      if (err) {
        console.log(chalk.yellow(JSON.stringify(err)))
      } else {
        console.log(chalk.green('Tweet deleted'))
      }
    }

    if (i + 1 === tweets.length) {
      return console.log(chalk.green('Done!'))
    }

    console.log(chalk.green(`Next call in ${next}ms`))
    setTimeout(function() {
      deleteTweet(tweets, i+1)
    }, next)
  })
}
