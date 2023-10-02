<p align="right" width="100%">
    <img width="20%" align="right" src="https://res.cloudinary.com/dicrh8yqo/image/upload/v1696164609/babysitters-images/test/xgu4759udsb2pookrmws.png">
</p>

# Babysitter-Service-App


Babysitter services **Full-Stack Application**, designed to provide a **modern solution** to the task of finding a babysitter. The application provides a solution for the 2 sides of the babysitter market: The service providers - The babysitters, and the customers - People (mostly parents) who are interested in babysitting services.
</br>
- As a **babysitter**, you can register for the app, edit personal information, see customer's reviews, etc.
- As a **customer**, you can search for babysitters by name / city / age ranges, view reviews of previous customers on each babysitter, add reviews to help future customers decide, etc.
</br>
Today, most of the market is managed according to the "Word-of-mouth advertising" method, something that does not correspond to today's modern era, and that is why I developed the application. I think the app can help this industry grow and make it easier for both the babysitters and the customers in their task.

## Tech

Dillinger uses a number of open source projects to work properly:

- [VueJS] - A JavaScript framework for building user interfaces.
- [TailwindCSS] - CSS framework for rapidly building custom user interfaces.
- [node.js] - Evented I/O for the backend.
- [MongoDB] - MongoDB is a NoSQL database management application.
- [Express] - Fast node.js network app framework [@tjholowaychuk]
- [Cloudinary] - Cloudinary provides a secure and comprehensive API for easily uploading media.
- [JsonWebToken] - Supports authorization and information exchange.
- [Vite] - A frontend tool that is used for building fast and optimized web applications.

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://angular.io" target="_blank" rel="noreferrer"> <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://vuejs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg" alt="vuejs" width="40" height="40"/> </a> <a href="https://vuetifyjs.com/en/" target="_blank" rel="noreferrer"> <img src="https://bestofjs.org/logos/vuetify.svg" alt="vuetify" width="40" height="40"/> </a> </p>


## Installation

The app requires [Node.js](https://nodejs.org/) v18+ to run.
</br>
Every part of the app ([Front-end] / [Back-end]) requires a ```.env``` file with specific variables to run.
</br> 
In every sub-directory([Front-end] / [Back-end]) you can find an Installation guide + list of the **required variables**.

## Services

The application requires a connection to a Mongo database and a Cloudinary images upload service. 
</br>
There are free plans for both of these services.
</br>
Instructions for creating an account are in the links below.

| Service | Link |
| ------ | ------ |
| MongoDB Atlas | [MongoDB] |
| Cloudinary | [Cloudinary] |

## DB Modules

The DB Modules (collections) used in this app and their methods.

| Collection | Actions |
| ------ | ------ |
| Babysitter | ```get one, get all, create, update, add review``` |
| Customer | ```get one, get all, create, update, add review``` |
| Review | ```get one, get all by customer, get all by babysitter, create``` |

## Demo

The application demo is hosted on [Render] cloud in this link:
##### [Babysitter-App-Demo](https://babysitter-app.onrender.com/)


</br>

<p align="left" width="100%" height="200">
    <img width="22%" height="200" align="right" src="https://res.cloudinary.com/dicrh8yqo/image/upload/v1696207870/babysitters-images/test/gafnzs99yapouh9pptyw.jpg">
    <img width="22%" height="200" align="right" src="https://res.cloudinary.com/dicrh8yqo/image/upload/v1696207870/babysitters-images/test/itdg1koxumfaorgvowsf.jpg">
    <img width="23%" height="200" align="right" src="https://res.cloudinary.com/dicrh8yqo/image/upload/v1696207871/babysitters-images/test/weurskewjr472y1l12we.jpg">
    <img width="23%" height="200" align="right" src="https://res.cloudinary.com/dicrh8yqo/image/upload/v1696207870/babysitters-images/test/llsuj3o78ujucvwrewwt.jpg">
</p>

</br>
</br>



## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/roy-mizrahi-aa5450156//)

## License

[MIT](https://choosealicense.com/licenses/mit/)


[Vite]: <https://vitejs.dev/>
[Render]: <https://render.com/>
[JsonWebToken]: <https://www.npmjs.com/package/jsonwebtoken>
[Cloudinary]: <https://cloudinary.com/>
[node.js]: <http://nodejs.org>
[TailwindCSS]: <https://tailwindcss.com/>
[MongoDB]: <https://www.mongodb.com/atlas/>
[@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
[express]: <http://expressjs.com>
[VueJS]: <https://vuejs.org/>
[Back-end]: <https://github.com/RoyGuf/Babaysitter-App-BackEnd>
[Front-end]: <https://github.com/RoyGuf/Baby-Sitter-App/tree/main/vuejs-babysitter-app-FrontEnd>