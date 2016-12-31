# tube-sock-puppet
POST to the server and if you guess the number, your YouTube video will play on the `index.html` page

expected payload

```javascript
{
  url: 'http://10.0.1.104:8081/bouncer', // url to the gibson
  form: {
    video_id: 'cgRsYkKb1eI', // youtube video ID
    guess: i, // a number between 0 and 2000
    username: 'Sewellc00L' // your username
  }
}
```

## getting started
1. clone and change directory into project
1. `$ npm install`
1. `$ npm start`