# Tweets Cleaner

*Delete old tweets.*

## Why?
The Twitter API only gives access to your **3200 last tweets** to third party apps, that's already a lot but we are talking about big ol accounts!

Here, tweets are accessed through your .zip archive and allows you to delete old tweets from your account.

## Warning

> **This scripts definitely deletes some of your tweets!**

## Usage

- [Request you Twitter archive](https://twitter.com/settings/account) (you might want to keep it safe, if you ever miss your tweets!)
- [Create an app on Twitter](https://apps.twitter.com/) the get your keys
- Download or clone the repo
- Rename `config.sample.js` by `config.js` and set your keys and settings
- In `config.js` Set the `maxDate`, **your tweets older than this date will be deleted**:exclamation:
- Copy `tweets.csv` from your Twitter archive from step 1 in the same directory, or the path specified in `config.js`
- `$ npm i; npm start` :fire:


#### License WTFPL
