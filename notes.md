Hello.

My name is Dan DuLeone, and I am a cofounder and the CTO of Red Queen Gaming.

I'd like to start by thanking everyone for coming out tonight, and of course for sticking around for this talk. Also, I'd like to thank Guru for hosting this event tonight, and for providing speakers. And I'd like to thank my wife, who isn't here in the audience tonight, but she deserves it.

Again, my name is Dan and I've been building software to solve other people's problems for 20 years.

At Red Queen, we're constantly searching for innovative ways to work with game data and APIs. In this pursuit, I recently discovered some software I think is cool called "GraphQL-Yoga", and I want to share it with you and talk about why I like it.

What is Yoga?

Easiest way to run a GraphQL server: Sensible defaults & includes everything you need with minimal setup.
Compatible: Works with all GraphQL clients (Apollo, Relay...) and fits seamless in your GraphQL workflow.

https://www.npmjs.com/package/graphql-yoga
https://github.com/prisma/graphql-yoga

How to install?

npm init -y 
npm install --save graphql-yoga
npm install npm-fetch

npm install --save-dev nodemon
{
  ...
  "scripts": {
    ...
    "start": "nodemon index.js"
  },
  ...
}



Quickstart

import { GraphQLServer } from 'graphql-yoga'
// ... or using `require()`
// const { GraphQLServer } = require('graphql-yoga')
 
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`
 
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
}
 
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))




So, why do I think it's cool?

Well, I'm frequently rolling out new APIs to support toolmakers building for different games, or to power various projects I build.
Yoga makes it fast and easy for me to create these APIs with a powerful GraphQL interface and a helpful Playground.
I'll give you an example:


Suppose you wanted to build an app that gave users information about a zipcode. Users enter a five-digit zipcode and your app will retrieve the city and state from the USPS, the current weather, and information about their elected representatives. This requires pulling data from 3 seprate APIs, but with the power of Yoga, our app client can get all of this information with just 1 API call.

I'll show you how.


First, I'm a big fan of simple code discrete code. When building an API, I like to put myself in the shoes of my intended users, and think about the code they might try to write.

So here's the simplest graphql query I could come up with, to supply a zipcode, and lookup usps, weather and representatives data:

query{
  lookup(zipcode: "08901"){
    usps
    weather,
    reps
  }
}

I'll translate this for anyone not familiar with GraphQL:
  1. We're going to call a query called "lookup"
  2. We're going to pass in a value called "zipcode"
  3. We'd like our response to include three fields: `usps`, `weather` and `reps`



And here's all the GraphQL schema I need to support that query:

scalar ZipCodeResult
scalar WeatherResult
scalar RepresentativesResult

type ResultSet {
    usps: ZipCodeResult,
    weather: WeatherResult
    reps: [RepresentativesResult]
}

type Query {
    lookup(zipcode: String): ResultSet
}

  1. We define 3 scalar types, one for each data results.
  2. We then declare a single ResultSet object, to collect our response
  3. We define our `Query` type, and our single `lookup` query with a `zipcode` `String` parameter that returns our defined `ResultSet`.

Short and sweet, right?

I'll point out, this is super lazy. Really, I should define specific types for each of the three Results, and I will show you that in a minute. But I want to point out that this will get you up and running with all of your data, even before you know what it looks like.



That's a lot of GraphQL, but we haven't written any JavaScript yet... 
So let's talk about what our JavaScript is going to be responsible for:
  1. Tying our whole application together (index.js)
  2. Making our API calls
  3. Resolving our lookup query by calling our APIs and assembling the response


So, before I go any further, let me just show you how my api calls work.

... show each function ...

They're each just async wrappers around simple fetch calls.
... I can demo them in the console with a simple demo script ...

So now that you've seen the remote API calls, the schema to describe our makeshift API, and the simple query our user wants to send us,
here's my index.js:

const { GraphQLServer } = require('graphql-yoga')
const getUsps = require('./apis/getUsps');
const getWeather = require('./apis/getWeather');
const getRepresentatives = require('./apis/getRepresentatives');

const typeDefs = `
  scalar ZipCodeResult
  scalar WeatherResult
  scalar RepresentativesResult

  type ResultSet {
      usps: ZipCodeResult,
      weather: WeatherResult
      reps: [RepresentativesResult]
  }

  type Query {
      lookup(zipcode: String): ResultSet
  }
`;

const resolvers = {
    Query: {
        lookup: async (_, { zipcode }) => {
            const usps = getUsps(zipcode);
            const weather = getWeather(zipcode);
            const reps = getRepresentatives(zipcode);
            return {usps, weather, reps};
        },
    },
};
 
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))



And that's all we had to do. Now, check out what happens when I run my query in our playground...


(IF THERE'S STILL TIME LEFT...)
So if you're only doing this for a hackathon or to prototype something, and you are content to do the rest of the data processing in your client, you can stop right here and go on. But if you want to add the power of GraphQL, you can get a little more granular with your type definitions. I'll show you.




Pros & Cons

What I learned...

Alternatives













fetch("https://tools.usps.com/tools/app/ziplookup/cityByZip", {
  "credentials":"include",
  "headers":{
    "accept":"application/json, text/javascript, */*; q=0.01",
    "accept-language":"en-US,en;q=0.9",
    "cache-control":"no-cache",
    "content-type":"application/x-www-form-urlencoded; charset=UTF-8",
    "pragma":"no-cache",
    "x-requested-with":"XMLHttpRequest"
  },
  "referrer":"https://tools.usps.com/zip-code-lookup.htm?citybyzipcode",
  "referrerPolicy":"no-referrer-when-downgrade",
  "body":"zip=08002",
  "method":"POST",
  "mode":"cors"
});


http://api.openweathermap.org/data/2.5/weather?zip=08002,us&appid=cdb2fb4e56b8b57bf6ed15af4cfa295f
http://api.openweathermap.org/data/2.5/weather?zip=08002,us&apikey=cdb2fb4e56b8b57bf6ed15af4cfa295f




{ coord: { lon: -74.45, lat: 40.49 },
  weather:
   [ { id: 500, main: 'Rain', description: 'light rain', icon: '10n' },
     { id: 600, main: 'Snow', description: 'light snow', icon: '13n' },
     { id: 300,
       main: 'Drizzle',
       description: 'light intensity drizzle',
       icon: '09n' },
     { id: 701, main: 'Mist', description: 'mist', icon: '50n' },
     { id: 721, main: 'Haze', description: 'haze', icon: '50n' } ],
  base: 'stations',
  main:
   { temp: 274.33,
     pressure: 1014,
     humidity: 100,
     temp_min: 273.15,
     temp_max: 275.15 },
  visibility: 11265,
  wind: { speed: 2.32, deg: 91.007 },
  rain: { '1h': 0.56 },
  snow: { '1h': 0.13 },
  clouds: { all: 90 },
  dt: 1550467080,
  sys:
   { type: 1,
     id: 4686,
     message: 0.004,
     country: 'US',
     sunrise: 1550490444,
     sunset: 1550529394 },
  id: 420025304,
  name: 'New Brunswick',
  cod: 200 }
