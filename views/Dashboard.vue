<template>
    <div>
      <h1>Welcome, {{ user.username }}</h1>
      <p>Discord ID: {{ user.discordId }}</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {},
      };
    },
    async mounted() {
      const response = await axios.get('http://localhost:3000/auth/status', {
        withCredentials: true,
      });
      if (response.data.isAuthenticated) {
        this.user = response.data.user;
      } else {
        this.$router.push('/login');
      }
    },
    methods: {
      async logout() {
        await axios.get('http://localhost:3000/auth/logout', {
          withCredentials: true,
        });
        this.$router.push('/login');
      },
    },
  };
  </script>
  