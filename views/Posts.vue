<template>
    <div>
      <h1>Posts</h1>
      <div v-for="post in posts" :key="post._id" class="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
        <p>Price: {{ post.price }}</p>
        <p>Discord: {{ post.discordUsername }}</p>
        <p>In-Game: {{ post.inGameUsername }}</p>
        <div v-if="post.user._id === user._id || user.isAdmin">
          <button @click="editPost(post)">Edit</button>
          <button @click="deletePost(post._id)">Delete</button>
        </div>
      </div>
      <button v-if="user" @click="createPost">Create Post</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        posts: [],
        user: null,
      };
    },
    async mounted() {
      const userRes = await axios.get('http://localhost:3000/auth/status', {
        withCredentials: true,
      });
      this.user = userRes.data.user;
  
      const postsRes = await axios.get('http://localhost:3000/api/posts');
      this.posts = postsRes.data;
    },
    methods: {
      async createPost() {
        const newPost = {
          title: 'New Service',
          description: 'I offer a great service!',
          price: 100,
          discordUsername: this.user.username,
          inGameUsername: 'MyGameName',
        };
        const res = await axios.post('http://localhost:3000/api/posts', newPost, {
          withCredentials: true,
        });
        this.posts.push(res.data);
      },
      async editPost(post) {
        const updatedPost = { ...post, title: 'Updated Title' };
        const res = await axios.put(
          `http://localhost:3000/api/posts/${post._id}`,
          updatedPost,
          {
            withCredentials: true,
          }
        );
        const index = this.posts.findIndex(p => p._id === post._id);
        this.posts[index] = res.data;
      },
      async deletePost(id) {
        await axios.delete(`http://localhost:3000/api/posts/${id}`, {
          withCredentials: true,
        });
        this.posts = this.posts.filter(post => post._id !== id);
      },
    },
  };
  </script>
  

  <template>
    <div>
      <h1>Login</h1>
      <a href="http://localhost:3000/auth/discord">Sign in with Discord</a>
    </div>
  </template>