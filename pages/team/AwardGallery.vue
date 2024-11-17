<template>
    <div class="gallery">
      <h1>Award Gallery</h1>
      <div class="gallery-grid">
        <div
          class="gallery-item"
          v-for="member in members"
          :key="member.id"
        >
          <div class="image-wrapper">
            <img :src="member.image" :alt="member.name" />
          </div>
          <h2>{{ member.name }}</h2>
          <p class="award">Award: {{ member.award }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AwardGallery',
    data() {
      return {
        // Example data for gallery
        members: [
          {
            id: 1,
            name: 'Alice Johnson',
            award: 'Employee of the Month',
            image: 'https://via.placeholder.com/150',
          },
          {
            id: 2,
            name: 'Bob Smith',
            award: 'Top Contributor',
            image: 'https://via.placeholder.com/150',
          },
          {
            id: 3,
            name: 'Charlie Brown',
            award: 'Best Newcomer',
            image: 'https://via.placeholder.com/150',
          },
          {
            id: 4,
            name: 'Diana Lee',
            award: 'Leadership Award',
            image: 'https://via.placeholder.com/150',
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .gallery {
    text-align: center;
    padding: 2rem;
  }
  
  .gallery h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    justify-items: center;
  }
  
  .gallery-item {
    background-color: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s;
  }
  
  .gallery-item:hover {
    transform: scale(1.05);
  }
  
  .image-wrapper {
    height: 150px;
    width: 150px;
    margin: 0 auto 1rem;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  
  h2 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  .award {
    color: #777;
    font-style: italic;
  }
  </style>
  