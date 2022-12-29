<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
 @font-face {
  font-family: 'password';
  src: url('./assets/fonts/PasswordEntry.eot');
  src: local('☺'),
    url('./assets/fonts/PasswordEntry.eot?#iefix') format('embedded-opentype'), 
    url('./assets/fonts/PasswordEntry.ttf');
}
/* *{
   margin: 0;
} */
body,html{
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color:#2c3e50;
  height: 100%;
}
</style>
