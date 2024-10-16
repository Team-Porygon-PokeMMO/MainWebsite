<template>
  <UContainer>
    <div style="display: flex; flex-direction: column; align-items: center;">
    <h2 class="mt-6">Egg Cost for Genderless Breeding</h2>
    <p style="font-size: 0.8em; text-align: center;">Ensure all input fields are filled out in both the input section, and in the Cost per Batch section.</p>
</div>
    <h2 class="mt-6">Fixed Costs</h2>
    <div class="fixed-costs">
      <p><b>Netballs:</b> ${{ netballCost.toLocaleString() }}</p>
      <p><b>Pokeballs:</b> ${{ pokeballCost.toLocaleString() }}</p>
      <p><b>Mailing Fee:</b> ${{ mailingFee.toLocaleString() }}</p>
      <p><b>Ratio No Donator:</b> {{ ratioNoDonator.toLocaleString() }}</p>
      <p><b>Ratio Donator:</b> {{ ratioDonator.toLocaleString() }}</p>
      <p><b>Ratio Donator + Shiny Charm:</b> {{ ratioDonatorShinyCharm.toLocaleString() }}</p>
    </div>

    <h2 class="mt-6">Inputs</h2>
    <div class="inputs-section">
      <div class="m-2">
        <label for="actualEggs">Actual Number of Eggs Hatched for Shiny:</label>
        <UInput v-model.number="actualEggs" type="number" @input="updateCosts" />
      </div>
        <div>
          <div class="m-2">
    <label for="shinyCharmCost">Shiny Charm Cost:</label>
    <UInput 
      v-model="shinyCharmCost" 
      placeholder="Enter cost" 
      type="number" 
    />
  </div>
  </div>

  <div>
    <div class="m-2">
    <label for="dittoBoxCost">Ditto Box Cost:</label>
    <UInput 
      v-model="dittoBoxCost" 
      placeholder="Enter cost" 
      type="number" 
    />
  </div>
  </div>

  <div>
    <div class="m-2">
    <label for="donatorStatusCost">30 Day Donator Status Cost:</label>
    <UInput 
      v-model="donatorStatusCost" 
      placeholder="Enter cost" 
      type="number" 
    />
  </div>
  </div>
    </div>

    <h2 class="mt-6">Odds</h2>
    <div class="odds-section">
      <div class="m-2">
        <label>Odds with No Donator Status:</label>
        <UInput v-model.number="noDonatorOdds" type="number" disabled :value="noDonatorOdds" />
      </div>
      <div class="m-2">
        <label>Batches of Eggs (No Donator Status):</label>
        <UInput v-model.number="batchesNoDonator" type="number" disabled :value="batchesNoDonator" />
      </div>
      <div class="m-2">
        <label>Odds with Donator Status:</label>
        <UInput v-model.number="donatorOdds" type="number" disabled :value="donatorOdds" />
      </div>
      <div class="m-2">
        <label>Batches of Eggs (Donator Status):</label>
        <UInput v-model.number="batchesDonator" type="number" disabled :value="batchesDonator" />
      </div>
      <div class="m-2">
        <label>Odds with Donator Status + Shiny Charm:</label>
        <UInput v-model.number="shinyCharmOdds" type="number" disabled :value="shinyCharmOdds" />
      </div>
      <div class="m-2">
        <label>Batches of Eggs (Donator Status + Shiny Charm):</label>
        <UInput v-model.number="batchesShinyCharm" type="number" disabled :value="batchesShinyCharm" />
      </div>
      <div class="m-2">
        <label>Netball Catch Rate:</label>
        <UInput v-model.number="netballCatchRate" type="number" disabled :value="netballCatchRate" />
      </div>
    </div>

    <h2 class="mt-6">Cost per Batch</h2>
    <p style="font-size: 0.8em; text-align: left;">Caught section is based on catching your own dittos for egging.</p>
    <p style="font-size: 0.8em; text-align: left;">Bought section is based on purchasing your dittos for egging.</p>
<div class="cost-per-batch">
  <div class="m-2">
    <label for="eggs">Eggs made per Shiny Charm:</label>
    <UInput v-model.number="eggs" type="number" @input="updateCosts" />
  </div>
  <div class="m-2">
    <label for="monthsSpent">Months Spent Egging:</label>
    <UInput v-model.number="monthsSpent" type="number" @input="updateCosts" />
  </div>
  <div class="m-2">
    <label>Total Netball Cost:</label>
    <UInput :value="formattedTotalNetballCost" type="text" disabled />
  </div>
  <div class="m-2">
    <label>Total Pokeball Cost:</label>
    <UInput :value="formattedTotalPokeballCost" type="text" disabled />
  </div>
  <div class="m-2">
    <label>Total Ball Cost:</label>
    <UInput :value="formattedTotalBallCost" type="text" disabled />
  </div>
  <div class="m-2">
    <label>Total Mailing Cost:</label>
    <UInput :value="formattedTotalMailingCost" type="text" disabled />
  </div>
  <div class="m-2">
    <label>Shiny Charm Cost:</label>
    <UInput :value="formattedShinyCharmCost" type="text" disabled />
  </div>
  <div class="m-2">
    <label>Total Batch Cost (Catching):</label>
    <UInput :value="formattedTotalBatchCost" type="text" disabled />
  </div>
  <div class="m-2">
    <label>Total Batch Cost (Buying):</label>
    <UInput :value="formattedTotalBatchBuyingCost" type="text" disabled />
  </div>
</div>

    <h2 class="mt-6">Average Total Per Shiny</h2>
    <p style="font-size: 0.8em; text-align: left;">Caught section is based on catching your own dittos for egging.</p>
    <p style="font-size: 0.8em; text-align: left;">Bought section is based on purchasing your dittos for egging.</p>
<div class="average-total">
  <h3 class="large-subtitle">Caught</h3>
  <div class="m-2">
    <label>No Dono Caught:</label>
    <UInput :value="formattedNoDonoCaught" type="text" disabled />
  </div>
  <div class="m-2">
    <label>Dono Caught:</label>
    <UInput :value="formattedDonoCaught" type="text" disabled />
  </div>
  <div class="m-2">
    <label>Dono + Charm Caught:</label>
    <UInput :value="formattedDonoCharmCaught" type="text" disabled />
  </div>

  <h3 class="large-subtitle">Bought</h3>
  <div class="m-2">
    <label>No Dono Bought:</label>
    <UInput :value="formattedNoDonoBought" type="text" disabled />
  </div>
  <div class="m-2">
    <label>Dono Bought:</label>
    <UInput :value="formattedDonoBought" type="text" disabled />
  </div>
  <div class="m-2">
    <label>Dono + Charm Bought:</label>
    <UInput :value="formattedDonoCharmBought" type="text" disabled />
  </div>
</div>

    <h2 class="mt-6">Total Spent for Shiny</h2>
    <p style="font-size: 0.8em; text-align: left;">Caught section is based on catching your own dittos for egging.</p>
    <p style="font-size: 0.8em; text-align: left;">Bought section is based on purchasing your dittos for egging.</p>
    <div class="total-spent">
  <h3 class="large-subtitle">Caught</h3>
  <div class="m-2">
    <label>No Dono Caught:</label>
    <UInput :value="formattedNoDonoCaughtSpent" type="text" disabled />
  </div>
  <div class="m-2">
    <label>Dono Caught:</label>
    <UInput :value="formattedDonoCaughtSpent" type="text" disabled />
  </div>
  <div class="m-2">
    <label>Dono + Charm Caught:</label>
    <UInput :value="formattedDonoCharmCaughtSpent" type="text" disabled />
  </div>

  <h3 class="large-subtitle">Bought</h3>
  <div class="m-2">
    <label>No Dono Bought:</label>
    <UInput :value="formattedNoDonoBoughtSpent" type="text" disabled />
  </div>
  <div class="m-2">
    <label>Dono Bought:</label>
    <UInput :value="formattedDonoBoughtSpent" type="text" disabled />
  </div>
  <div class="m-2">
    <label>Dono + Charm Bought:</label>
    <UInput :value="formattedDonoCharmBoughtSpent" type="text" disabled />
  </div>
</div>
  </UContainer>
</template>

<script>
export default {
  data() {
    return {
      costPrice: 0,
      quantity: 0,
      totalCost: null,
      netballCost: 1350,
      pokeballCost: 200,
      shinyCharmCost: 0,
      dittoBoxCost: 0,
      mailingFee: 1600,
      donatorStatusCost: 0,
      // Odds values
      noDonatorOdds: 30000,
      batchesNoDonator: 0,
      donatorOdds: 27000,
      batchesDonator: 0,
      shinyCharmOdds: 24300,
      batchesShinyCharm: 0,
      netballCatchRate: 0.9,
      // Cost per batch
      eggs: 0,
      monthsSpent: 0,
      totalNetballCost: 0,
      totalPokeballCost: 0,
      totalBallCost: 0,
      totalMailingCost: 0,
      totalBatchCost: 0,
      totalBatchBuyingCost: 0,
      // Average Total Per Shiny
      noDonoCaught: 0,
      donoCaught: 0,
      donoCharmCaught: 0,
      noDonoBought: 0, 
      donoBought: 0,   
      donoCharmBought: 0, 
      // Average Total Per Shiny Bought
      noDonoBought: 0,
      donoBought: 0,
      donoCharmBought: 0,
      // User input
      actualEggs: 0,
    };
  },
  computed: {
  ratioNoDonator() {
    return this.actualEggs > 0 ? this.actualEggs / this.noDonatorOdds : 0;
  },
  ratioDonator() {
    return this.actualEggs > 0 ? this.actualEggs / this.donatorOdds : 0;
  },
  ratioDonatorShinyCharm() {
    return this.actualEggs > 0 ? this.actualEggs / this.shinyCharmOdds : 0;
  },
  noDonoCaughtSpent() {
    return parseInt(this.noDonoCaught * this.ratioNoDonator);
  },
  donoCaughtSpent() {
    return parseInt(this.donoCaught * this.ratioDonator);
  },
  donoCharmCaughtSpent() {
    return parseInt(this.donoCharmCaught * this.ratioDonatorShinyCharm);
  },
  noDonoBoughtSpent() {
    return parseInt(this.noDonoBought * this.ratioNoDonator);
  },
  donoBoughtSpent() {
    return parseInt(this.donoBought * this.ratioDonator);
  },
  donoCharmBoughtSpent() {
    return parseInt(this.donoCharmBought * this.ratioDonatorShinyCharm);
  },
  formattedNoDonoCaught() {
    return `$${parseInt(this.noDonoCaught).toLocaleString()}`;
  },
  formattedDonoCaught() {
    return `$${parseInt(this.donoCaught).toLocaleString()}`;
  },
  formattedDonoCharmCaught() {
    return `$${parseInt(this.donoCharmCaught).toLocaleString()}`;
  },
  formattedNoDonoBought() {
    return `$${parseInt(this.noDonoBought).toLocaleString()}`;
  },
  formattedDonoBought() {
    return `$${parseInt(this.donoBought).toLocaleString()}`;
  },
  formattedDonoCharmBought() {
    return `$${parseInt(this.donoCharmBought).toLocaleString()}`;
  },
  formattedTotalNetballCost() {
    return `$${parseInt(this.totalNetballCost).toLocaleString()}`;
  },
  formattedTotalPokeballCost() {
    return `$${parseInt(this.totalPokeballCost).toLocaleString()}`;
  },
  formattedTotalBallCost() {
    return `$${parseInt(this.totalBallCost).toLocaleString()}`;
  },
  formattedTotalMailingCost() {
    return `$${parseInt(this.totalMailingCost).toLocaleString()}`;
  },
  formattedShinyCharmCost() {
    return `$${parseInt(this.shinyCharmCost).toLocaleString()}`;
  },
  formattedTotalBatchCost() {
    return `$${parseInt(this.totalBatchCost).toLocaleString()}`;
  },
  formattedTotalBatchBuyingCost() {
    return `$${parseInt(this.totalBatchBuyingCost).toLocaleString()}`;
  },
  formattedNoDonoCaughtSpent() {
    return `$${parseInt(this.noDonoCaughtSpent).toLocaleString()}`;
  },
  formattedDonoCaughtSpent() {
    return `$${parseInt(this.donoCaughtSpent).toLocaleString()}`;
  },
  formattedDonoCharmCaughtSpent() {
    return `$${parseInt(this.donoCharmCaughtSpent).toLocaleString()}`;
  },
  formattedNoDonoBoughtSpent() {
    return `$${parseInt(this.noDonoBoughtSpent).toLocaleString()}`;
  },
  formattedDonoBoughtSpent() {
    return `$${parseInt(this.donoBoughtSpent).toLocaleString()}`;
  },
  formattedDonoCharmBoughtSpent() {
    return `$${parseInt(this.donoCharmBoughtSpent).toLocaleString()}`;
  },
},
  watch: {
    eggs: 'updateCosts',
    netballCost: 'updateCosts',
    netballCatchRate: 'updateCosts',
    pokeballCost: 'updateCosts',
    mailingFee: 'updateCosts',
    dittoBoxCost: 'updateCosts',
    monthsSpent: 'updateCosts',
    actualEggs: 'updateCosts', // Watch the actual eggs input
  },
  methods: {
    calculateTotalCost() {
      this.totalCost =
        this.costPrice * this.quantity +
        this.netballCost +
        this.pokeballCost +
        this.shinyCharmCost +
        this.dittoBoxCost +
        this.mailingFee +
        this.donatorStatusCost;
    },
    resetFields() {
      this.costPrice = 0;
      this.quantity = 0;
      this.totalCost = null;
      this.eggs = 0;
      this.monthsSpent = 0;
      this.totalNetballCost = 0;
      this.totalPokeballCost = 0;
      this.totalBallCost = 0;
      this.totalMailingCost = 0;
      this.totalBatchCost = 0;
      this.totalBatchBuyingCost = 0;
      this.batchesNoDonator = 0;
      this.batchesDonator = 0;
      this.batchesShinyCharm = 0;
      this.noDonoCaught = 0;
      this.donoCaught = 0;
      this.donoCharmCaught = 0;
      this.noDonoBought = 0;
      this.donoBought = 0;
      this.donoCharmBought = 0;
      this.actualEggs = 0; // Reset actual eggs
    },
    updateCosts() {
  this.totalNetballCost = (this.eggs * this.netballCost) / this.netballCatchRate; 
  this.totalPokeballCost = this.eggs * this.pokeballCost; 
  this.totalBallCost = this.totalNetballCost + this.totalPokeballCost; 
  this.totalMailingCost = (this.eggs / 5) * this.mailingFee; 
  this.totalBatchCost = this.totalBallCost + this.totalMailingCost + this.shinyCharmCost; 
  this.totalBatchBuyingCost = this.totalPokeballCost + (this.dittoBoxCost * (this.eggs / 60)) + this.shinyCharmCost;

  this.batchesNoDonator = this.noDonatorOdds / (this.eggs || 1); 
  this.batchesDonator = this.donatorOdds / (this.eggs || 1); 
  this.batchesShinyCharm = this.shinyCharmOdds / (this.eggs || 1); 

  // Update caught calculations without rounding
  this.noDonoCaught = (this.totalBatchCost - this.shinyCharmCost) * this.batchesNoDonator;
  this.donoCaught = (this.totalBatchCost - this.shinyCharmCost) * this.batchesDonator + (this.donatorStatusCost * this.monthsSpent);
  this.donoCharmCaught = (this.totalBatchCost * this.batchesShinyCharm) + (this.donatorStatusCost * this.monthsSpent);

  // Update bought calculations without rounding
  this.noDonoBought = (this.totalBatchBuyingCost - this.shinyCharmCost) * this.batchesNoDonator;
  this.donoBought = (this.totalBatchBuyingCost - this.shinyCharmCost) * this.batchesDonator + (this.donatorStatusCost * this.monthsSpent);
  this.donoCharmBought = (this.totalBatchBuyingCost * this.batchesShinyCharm) + (this.donatorStatusCost * this.monthsSpent);
  
  // Convert to integers for display
  this.noDonoCaught = parseInt(this.noDonoCaught);
  this.donoCaught = parseInt(this.donoCaught);
  this.donoCharmCaught = parseInt(this.donoCharmCaught);
  this.noDonoBought = parseInt(this.noDonoBought);
  this.donoBought = parseInt(this.donoBought);
  this.donoCharmBought = parseInt(this.donoCharmBought);
},
  },
};
</script>



<style scoped>
.result {
  margin-top: 20px;
  font-weight: bold;
}
.fixed-costs,
.odds-section,
.cost-per-batch,
.average-total,
.inputs-section,
.total-spent {
  margin-top: 20px;
}
.large-subtitle {
  font-size: 1.5em; /* Adjust size as needed */
}
</style>