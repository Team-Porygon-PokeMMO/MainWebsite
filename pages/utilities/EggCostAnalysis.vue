<template>
  <UContainer>
    <h2 class="mt-6">Fixed Costs</h2>
    <div class="fixed-costs">
      <p><b>Netballs:</b> ${{ netballCost.toLocaleString() }}</p>
      <p><b>Pokeballs:</b> ${{ pokeballCost.toLocaleString() }}</p>
      <p><b>Shiny Charms:</b> ${{ shinyCharmCost.toLocaleString() }}</p>
      <p><b>Ditto Box Cost:</b> ${{ dittoBoxCost.toLocaleString() }}</p>
      <p><b>Mailing Fee:</b> ${{ mailingFee.toLocaleString() }}</p>
      <p><b>30 Day Donator Status:</b> ${{ donatorStatusCost.toLocaleString() }}</p>
      <p><b>Ratio No Donator:</b> {{ ratioNoDonator.toLocaleString() }}</p>
      <p><b>Ratio Donator:</b> {{ ratioDonator.toLocaleString() }}</p>
      <p><b>Ratio Donator + Shiny Charm:</b> {{ ratioDonatorShinyCharm.toLocaleString() }}</p>
    </div>

    <h2 class="mt-6">Inputs</h2>
    <div class="inputs-section">
      <div class="m-2">
        <label for="actualEggs">Actual Eggs:</label>
        <UInput v-model.number="actualEggs" type="number" @input="updateCosts" />
      </div>
    </div>

    <h2 class="mt-6">Odds</h2>
    <div class="odds-section">
      <div class="m-2">
        <label>No Donator Status:</label>
        <UInput v-model.number="noDonatorOdds" type="number" disabled :value="noDonatorOdds" />
      </div>
      <div class="m-2">
        <label>Batches (No Donator Status):</label>
        <UInput v-model.number="batchesNoDonator" type="number" disabled :value="batchesNoDonator" />
      </div>
      <div class="m-2">
        <label>Donator Status:</label>
        <UInput v-model.number="donatorOdds" type="number" disabled :value="donatorOdds" />
      </div>
      <div class="m-2">
        <label>Batches (Donator Status):</label>
        <UInput v-model.number="batchesDonator" type="number" disabled :value="batchesDonator" />
      </div>
      <div class="m-2">
        <label>Donator Status + Shiny Charm:</label>
        <UInput v-model.number="shinyCharmOdds" type="number" disabled :value="shinyCharmOdds" />
      </div>
      <div class="m-2">
        <label>Batches (Donator Status + Shiny Charm):</label>
        <UInput v-model.number="batchesShinyCharm" type="number" disabled :value="batchesShinyCharm" />
      </div>
      <div class="m-2">
        <label>Netball Catch Rate:</label>
        <UInput v-model.number="netballCatchRate" type="number" disabled :value="netballCatchRate" />
      </div>
    </div>

    <h2 class="mt-6">Cost per Batch</h2>
<div class="cost-per-batch">
  <div class="m-2">
    <label for="eggs">Eggs:</label>
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
      shinyCharmCost: 240000,
      dittoBoxCost: 240000,
      mailingFee: 1600,
      donatorStatusCost: 3450000,
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
  return Math.round(this.noDonoCaught * this.ratioNoDonator);
},
donoCaughtSpent() {
  return Math.round(this.donoCaught * this.ratioDonator);
},
donoCharmCaughtSpent() {
  return Math.round(this.donoCharmCaught * this.ratioDonatorShinyCharm);
},
noDonoBoughtSpent() {
  return Math.round(this.noDonoBought * this.ratioNoDonator);
},
donoBoughtSpent() {
  return Math.round(this.donoBought * this.ratioDonator);
},
donoCharmBoughtSpent() {
  return Math.round(this.donoCharmBought * this.ratioDonatorShinyCharm);
},
formattedNoDonoCaught() {
    return `$${this.noDonoCaught.toLocaleString()}`;
  },
  formattedDonoCaught() {
    return `$${this.donoCaught.toLocaleString()}`;
  },
  formattedDonoCharmCaught() {
    return `$${this.donoCharmCaught.toLocaleString()}`;
  },
  
  formattedNoDonoBought() {
    return `$${this.noDonoBought.toLocaleString()}`;
  },
  formattedDonoBought() {
    return `$${this.donoBought.toLocaleString()}`;
  },
  formattedDonoCharmBought() {
    return `$${this.donoCharmBought.toLocaleString()}`;
  },
  formattedNoDonoBought() {
    return `$${this.noDonoBought.toLocaleString()}`;
  },
  formattedDonoBought() {
    return `$${this.donoBought.toLocaleString()}`;
  },
  formattedDonoCharmBought() {
    return `$${this.donoCharmBought.toLocaleString()}`;
  },
  formattedTotalNetballCost() {
    return `$${this.totalNetballCost.toLocaleString()}`;
  },
  formattedTotalPokeballCost() {
    return `$${this.totalPokeballCost.toLocaleString()}`;
  },
  formattedTotalBallCost() {
    return `$${this.totalBallCost.toLocaleString()}`;
  },
  formattedTotalMailingCost() {
    return `$${this.totalMailingCost.toLocaleString()}`;
  },
  formattedShinyCharmCost() {
    return `$${this.shinyCharmCost.toLocaleString()}`;
  },
  formattedTotalBatchCost() {
    return `$${this.totalBatchCost.toLocaleString()}`;
  },
  formattedTotalBatchBuyingCost() {
    return `$${this.totalBatchBuyingCost.toLocaleString()}`;
  },
  formattedNoDonoCaughtSpent() {
    return `$${this.noDonoCaughtSpent.toLocaleString()}`;
  },
  formattedDonoCaughtSpent() {
    return `$${this.donoCaughtSpent.toLocaleString()}`;
  },
  formattedDonoCharmCaughtSpent() {
    return `$${this.donoCharmCaughtSpent.toLocaleString()}`;
  },
  formattedNoDonoBoughtSpent() {
    return `$${this.noDonoBoughtSpent.toLocaleString()}`;
  },
  formattedDonoBoughtSpent() {
    return `$${this.donoBoughtSpent.toLocaleString()}`;
  },
  formattedDonoCharmBoughtSpent() {
    return `$${this.donoCharmBoughtSpent.toLocaleString()}`;
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
  this.totalNetballCost = Math.round((this.eggs * this.netballCost) / this.netballCatchRate); // Calculate Total Netball Cost
  this.totalPokeballCost = Math.round(this.eggs * this.pokeballCost); // Calculate Total Pokeball Cost
  this.totalBallCost = Math.round(this.totalNetballCost + this.totalPokeballCost); // Calculate Total Ball Cost
  this.totalMailingCost = Math.round((this.eggs / 5) * this.mailingFee); // Calculate Total Mailing Cost
  this.totalBatchCost = Math.round(this.totalBallCost + this.totalMailingCost + this.shinyCharmCost); // Calculate Total Batch Cost (Catching)
  this.totalBatchBuyingCost = Math.round((this.totalPokeballCost + (this.dittoBoxCost * (this.eggs / 60)) + this.shinyCharmCost)); // Calculate Total Batch Cost (Buying)

  this.batchesNoDonator = Math.round(this.noDonatorOdds / (this.eggs || 1)); // Calculate Batches for No Donator Status
  this.batchesDonator = Math.round(this.donatorOdds / (this.eggs || 1)); // Calculate Batches for Donator Status
  this.batchesShinyCharm = Math.round(this.shinyCharmOdds / (this.eggs || 1)); // Calculate Batches for Donator + Shiny Charm

  // Average Total Per Shiny Calculations
  this.noDonoCaught = Math.round((this.totalBatchCost - this.shinyCharmCost) * this.batchesNoDonator);
  this.donoCaught = Math.round((this.totalBatchCost - this.shinyCharmCost) * this.batchesDonator + (this.donatorStatusCost * this.monthsSpent));
  this.donoCharmCaught = Math.round((this.totalBatchCost * this.batchesShinyCharm) + (this.donatorStatusCost * this.monthsSpent));

  // Average Total Per Shiny Bought Calculations
  this.noDonoBought = Math.round((this.totalBatchBuyingCost - this.shinyCharmCost) * this.batchesNoDonator);
  this.donoBought = Math.round((this.totalBatchBuyingCost - this.shinyCharmCost) * this.batchesDonator + (this.donatorStatusCost * this.monthsSpent));
  this.donoCharmBought = Math.round((this.totalBatchBuyingCost * this.batchesShinyCharm) + (this.donatorStatusCost * this.monthsSpent));
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
