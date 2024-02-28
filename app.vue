<template>
  <body>
    <div id="app">
      <h1>{{ msg }}</h1>
      <img :src="signatureLink" alt="Pory Team Signature" />
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Team Porygon (PokeMMO) WebSite under construction',
      signatureLink: 'https://i.ibb.co/fq874Kt/Pory-Team-Signature.gif'
    }
  }
}
</script>

<style>
body {
  background-color: black;
  color: white;
}
</style>