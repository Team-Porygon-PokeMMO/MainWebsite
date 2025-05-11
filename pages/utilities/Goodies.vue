<template>
  <div class="container">
    <h1>Lootbox Selector</h1>

    <!-- Custom Lootbox dropdown -->
    <div class="select-container ">
      <label for="lootboxSelect">Select a Lootbox:</label>

      <!-- Custom Dropdown -->
      <div class="custom-dropdown" @click="toggleDropdown">
        <div class="selected-item">{{ selectedLootboxName || 'Select a Lootbox' }}</div>
        <div v-if="isDropdownOpen" class="dropdown-options">
          <div
            v-for="lootbox in lootboxes"
            :key="lootbox.id"
            class="dropdown-option"
            @click="selectLootbox(lootbox)"
          >
            <img :src="lootbox.iconUrl" alt="Lootbox icon" class="lootbox-icon" />
            {{ lootbox.name }}
          </div>
        </div>
      </div>
    </div>

    <!-- Display lootbox contents -->
    <div id="lootboxContents" v-if="selectedLootbox" class="lootbox-contents ">
      <h3>Contents:</h3>
      <ul class="content-list"> <!-- @click="redirectHub(item)" -->
        <li v-for="(item, index) in selectedLootbox.contents" :key="index" class="content-item" >
          {{ item }}
        </li>
      </ul>
    </div>
    <div v-else class="placeholder-text">
      <p>Please select a lootbox to view its contents.</p>
    </div>
  </div>
  <p style="width: 100%; justify-content: center; display: flex;">Please keep in mind this is a Work-in-Progress page and as such it might not be fully completed.</p>
</template>

<script>
    import allBoxes from '~/src/lootboxes/allBoxes.json';
    export default {
      data() {
        return {
          selectedLootboxId: '',
          selectedLootboxName: '',
          isDropdownOpen: false,
          lootboxes: allBoxes,
        };
      },
      computed: {
        selectedLootbox() {
          return this.lootboxes.find(lootbox => lootbox.id === this.selectedLootboxId);
        }
      },
      methods: {
        toggleDropdown() {
          this.isDropdownOpen = !this.isDropdownOpen;
        },
        selectLootbox(lootbox) {
          this.selectedLootboxId = lootbox.id;
          this.selectedLootboxName = lootbox.name;
          this.selectedLootbox = lootbox;
          this.updateLootboxContents();
        },
        updateLootboxContents() {
          // Triggered when the lootbox is selected
          console.log('Lootbox contents updated:', this.selectedLootbox);
          this.isDropdownOpen = false;
        },
        redirectHub(item) {
          item = item.replaceAll(' ', '-')
          item = item.replaceAll('%', '')
          item = item.replaceAll('+', '')
          item = item.replaceAll('(', '')
          item = item.replaceAll(')', '')
          window.location = "https://pokemmohub.com/items/"+item
        }
      }
    };
</script>

<style scoped>
  /* Container styling */
  .container {
    font-family: 'Arial', sans-serif;
    background-color: #f1f1f1; /* Slightly darker background */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: auto;
    text-align: center;
  }

  /* Heading styling */
  h1 {
    font-size: 2em;
    color: #333; /* Darker color for text */
    margin-bottom: 20px;
  }

  /* Custom Dropdown Styling */
  .select-container {
    margin-bottom: 20px;
  }

  label {
    font-size: 1.1em;
    color: #444; /* Darker gray */
  }

  .custom-dropdown {
    position: relative;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1em;
  }

  .selected-item {
    display: flex;
    align-items: center;
    color: #444;
  }

  .custom-dropdown:hover {
    border-color: #888;
  }

  .dropdown-options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    margin-top: 5px;
    max-height: 200px;
    overflow-y: auto;
  }

  .dropdown-option {
    padding: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #444;
  }

  .dropdown-option:hover {
    background-color: #f0f0f0;
  }

  .lootbox-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    object-fit: contain;
  }

  .lootbox-contents {
    margin-top: 20px;
    background-color: #ffffff; /* White background for lootbox */
    border: 1px solid #e0e0e0;
    padding: 15px;
    border-radius: 8px;
    box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.1);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  h3 {
    color: #386aa4; /* Blue color for headings */
    font-size: 1.3em;
    margin-bottom: 10px;
  }

  .content-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .content-item {
    padding: 8px;
    font-size: 1.1em;
    background-color: #f9f9f9;
    color: #444;
    margin-bottom: 8px;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    transition: background-color 0.3s ease;
  }

  .content-item:hover {
    background-color: #f1f1f1;
  }

  .placeholder-text {
    font-size: 1.2em;
    color: #666;
    margin-top: 20px;
  }

  /* Minor responsive design for smaller screens */
  @media (max-width: 480px) {
    .container {
      padding: 15px;
    }

    h1 {
      font-size: 1.8em;
    }

    .dropdown-option {
      font-size: 0.9em;
    }

    .content-item {
      font-size: 1em;
    }
  }

  #lootboxContents {
    max-height: 600px;
  }
</style>