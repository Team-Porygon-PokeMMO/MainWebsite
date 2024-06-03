Vue.component('expanding', {
  template: `
    <transition
      @beforeEnter="beforeEnter"
      @afterEnter="afterEnter"
      @beforeLeave="beforeLeave"
      @afterLeave="afterLeave"
    >
      <slot></slot>
    </transition>`,
  methods: {
    beforeEnter(el) {
      el.classList.remove("collapse");
      el.style.display = "block";
      el.classList.add("collapsing");
      el.style.height = `${el.scrollHeight}px`;
    },
    afterEnter(el) {
      el.classList.remove("collapsing");
      el.classList.add("collapse", "in");
      el.style.height = null;
    },
    beforeLeave(el) {
      el.style.height = `${el.scrollHeight}px`;
      el.classList.add("collapsing");
      el.classList.remove("collapse", "in");
      setTimeout(() => el.style.height = '0', 0);  // Ensure height transition starts
    },
    afterLeave(el) {
      el.classList.remove("collapsing");
      el.classList.add("collapse");
      el.style.display = "none";
      el.style.height = null;
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    regions: [
      {
        name: 'Kanto',
        visible: false,
        selectedOption: null,
        options: ['Lorelei', 'Bruno', 'Agatha', 'Lance', 'Blue']
      },
      {
        name: 'Johto',
        visible: false,
        selectedOption: null,
        options: ['Will', 'Koga', 'Bruno', 'Karen', 'Lance']
      },
      {
        name: 'Hoenn',
        visible: false,
        selectedOption: null,
        options: ['Sidney', 'Phoebe', 'Glacia', 'Drake', 'Steven']
      },
      {
        name: 'Sinnoh',
        visible: false,
        selectedOption: null,
        options: ['Aaron', 'Bertha', 'Flint', 'Lucian', 'Cynthia']
      },
      {
        name: 'Unova',
        visible: false,
        selectedOption: null,
        options: ['Shauntal', 'Grimsley', 'Caitlin', 'Marshal', 'Alder']
      }
    ],
    willLeadPokemon: [
      'Absol', 'Altaria', 'Bronzong', 'Claydol', 'Clefable',
      'Chansey', 'Electivire', 'Espeon', 'Empoleon', 'Exeggutor',
      'Flareon', 'Gardevoir', 'Girafarig', 'Golduck', 'Golurk',
      'Grumpig', 'Hypno', 'Jolteon', 'Jynx', 'Liepard',
      'Lucario', 'Mantine', 'Magnezone', 'Slowbro', 'Typhlosion',
      'Umbreon', 'Xatu'
    ],
    selectedPokemon: null
  },
  methods: {
    toggleRegion(index) {
      this.regions.forEach((region, i) => {
        if (i === index) {
          region.visible = !region.visible;
        } else {
          region.visible = false;
        }
      });
    },
    toggleOption(region, option) {
      if (region.selectedOption === option) {
        region.selectedOption = null;
      } else {
        region.selectedOption = option;
      }
    },
    togglePokemon(pokemon) {
      if (this.selectedPokemon === pokemon) {
        this.selectedPokemon = null;
      } else {
        this.selectedPokemon = pokemon;
      }
    }
  }
});
