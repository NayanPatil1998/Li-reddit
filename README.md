<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/NayanPatil1998/Li-reddit">
    <img src="https://raw.githubusercontent.com/NayanPatil1998/Li-reddit/main/lireddit-client/public/images/reddit-logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Lireddit</h3>

  <p align="center">
    Social media Platform like Reddit
    <br />
    <!-- <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a> -->
    <!-- <br />
    <br /> -->
    <a href="https://lireddit.nayanpatil.site">View Demo</a>
    ·
    <a href="https://github.com/NayanPatil1998/Li-reddit/issues">Report Bug</a>
    ·
    <a href="https://github.com/NayanPatil1998/Li-reddit/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<iframe width="400" height="240" src="https://www.youtube.com/embed/hwZvpWYOjFo" title="Lireddit - Reddit Clone built using PERN stack with Chakra UI, TypeORM, Chakra UI, Redis" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Lireddit is Reddit like mobile responsive Social Platform. Users can create an account and log into their account, can create Subreddits, posts, also upvote, downvote posts and comments etc.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [ReactQuery]
* [ChakraUI]
* [NestJs]
* [NodeJs]
* [PostgreSQL]
* [TypeORM]
* [Redis]

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow below instructions on setting up this project locally.

### Prerequisites

First you need to install Nodejs, PostgreSQL and Redis on your local system

After installing PostgreSQL, create USER and DATABASE

To create Database (use database user) use below command

```sh
  createdb lireddit
```



### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/NayanPatil1998/Li-reddit.git
   ```
2. cd into server folder
  ```sh
  cd lireddit-server
  ```

3. Install NPM packages
  ```sh
  yarn 
   ```
4. Edit DB data in `ormConfig.ts`
  ```ts
  const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  database: '',
  username: '',
  password: "",
  logging: true,
  synchronize: false,
  entities: ['dist/src/**/entities/*.entity.js'],
  autoLoadEntities: true,
  
  migrations: ['./dist/src/db/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/db/migrations',
  },
};
   ```
5. Run server
  ```sh
  yarn start:dev
   ```

6. Now cd into lireddit-client
  ```sh
  cd .../lireddit-client
   ```
7. Install NPM packages
  ```sh
  yarn 
   ```
8. Run client server
  ```sh
  yarn dev
   ```
