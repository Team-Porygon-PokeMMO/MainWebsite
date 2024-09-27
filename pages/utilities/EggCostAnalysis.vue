<template>
  <UContainer>
    <h1>Total Cost Calculator</h1>
    <div class="grid">
      <div class="m-2">
        <label for="costPrice">Cost Price:</label>
        <UInput v-model.number="costPrice" type="number" />
      </div>
      <div class="m-2">
        <label for="quantity">Quantity Purchased:</label>
        <UInput v-model.number="quantity" type="number" />
      </div>
    </div>
    <div class="center">
      <UButton @click="calculateTotalCost">Calculate Total Cost</UButton>
      <UButton @click="resetFields">Reset</UButton>
    </div>
    <div v-if="totalCost !== null" class="result">
      <h2>Total Cost: {{ totalCost }}</h2>
    </div>

    <h2 class="mt-6">Fixed Costs</h2>
    <div class="fixed-costs">
      <p><b>Netballs:</b> ${{ netballCost }}</p>
      <p><b>Pokeballs:</b> ${{ pokeballCost }}</p>
      <p><b>Shiny Charms:</b> ${{ shinyCharmCost }}</p>
      <p><b>Ditto Box Cost:</b> ${{ dittoBoxCost }}</p>
      <p><b>Mailing Fee:</b> ${{ mailingFee }}</p>
      <p><b>30 Day Donator Status:</b> ${{ donatorStatusCost }}</p>
      <p><b>Ratio No Donator:</b> {{ ratioNoDonator }}</p>
      <p><b>Ratio Donator:</b> {{ ratioDonator }}</p>
      <p><b>Ratio Donator + Shiny Charm:</b> {{ ratioDonatorShinyCharm }}</p>
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
        <UInput v-model.number="totalNetballCost" type="number" disabled :value="totalNetballCost" />
      </div>
      <div class="m-2">
        <label>Total Pokeball Cost:</label>
        <UInput v-model.number="totalPokeballCost" type="number" disabled :value="totalPokeballCost" />
      </div>
      <div class="m-2">
        <label>Total Ball Cost:</label>
        <UInput v-model.number="totalBallCost" type="number" disabled :value="totalBallCost" />
      </div>
      <div class="m-2">
        <label>Total Mailing Cost:</label>
        <UInput v-model.number="totalMailingCost" type="number" disabled :value="totalMailingCost" />
      </div>
      <div class="m-2">
        <label>Shiny Charm Cost:</label>
        <UInput v-model.number="shinyCharmCost" type="number" disabled :value="shinyCharmCost" />
      </div>
      <div class="m-2">
        <label>Total Batch Cost (Catching):</label>
        <UInput v-model.number="totalBatchCost" type="number" disabled :value="totalBatchCost" />
      </div>
      <div class="m-2">
        <label>Total Batch Cost (Buying):</label>
        <UInput v-model.number="totalBatchBuyingCost" type="number" disabled :value="totalBatchBuyingCost" />
      </div>
    </div>

    <h2 class="mt-6">Average Total Per Shiny</h2>
    <div class="average-total">
      <h3 class="large-subtitle">Caught</h3>
      <div class="m-2">
        <label>No Dono Caught:</label>
        <UInput v-model.number="noDonoCaught" type="number" disabled :value="noDonoCaught" />
      </div>
      <div class="m-2">
        <label>Dono Caught:</label>
        <UInput v-model.number="donoCaught" type="number" disabled :value="donoCaught" />
      </div>
      <div class="m-2">
        <label>Dono + Charm Caught:</label>
        <UInput v-model.number="donoCharmCaught" type="number" disabled :value="donoCharmCaught" />
      </div>

      <h3 class="large-subtitle">Bought</h3>
      <div class="m-2">
        <label>No Dono Bought:</label>
        <UInput v-model.number="noDonoBought" type="number" disabled :value="noDonoBought" />
      </div>
      <div class="m-2">
        <label>Dono Bought:</label>
        <UInput v-model.number="donoBought" type="number" disabled :value="donoBought" />
      </div>
      <div class="m-2">
        <label>Dono + Charm Bought:</label>
        <UInput v-model.number="donoCharmBought" type="number" disabled :value="donoCharmBought" />
      </div>
    </div>

    <h2 class="mt-6">Total Spent for Shiny</h2>
    <div class="total-spent">
      <h3 class="large-subtitle">Caught</h3>
      <div class="m-2">
        <label>No Dono Caught:</label>
        <UInput v-model.number="noDonoCaughtSpent" type="number" disabled :value="noDonoCaughtSpent" />
      </div>
      <div class="m-2">
        <label>Dono Caught:</label>
        <UInput v-model.number="donoCaughtSpent" type="number" disabled :value="donoCaughtSpent" />
      </div>
      <div class="m-2">
        <label>Dono + Charm Caught:</label>
        <UInput v-model.number="donoCharmCaughtSpent" type="number" disabled :value="donoCharmCaughtSpent" />
      </div>

      <h3 class="large-subtitle">Bought</h3>
      <div class="m-2">
        <label>No Dono Bought:</label>
        <UInput v-model.number="noDonoBoughtSpent" type="number" disabled :value="noDonoBoughtSpent" />
      </div>
      <div class="m-2">
        <label>Dono Bought:</label>
        <UInput v-model.number="donoBoughtSpent" type="number" disabled :value="donoBoughtSpent" />
      </div>
      <div class="m-2">
        <label>Dono + Charm Bought:</label>
        <UInput v-model.number="donoCharmBoughtSpent" type="number" disabled :value="donoCharmBoughtSpent" />
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
      // Ensure no division by zero by using a fallback value
      return this.actualEggs > 0 ? this.actualEggs / this.noDonatorOdds : 0;
    },
    noDonoCaughtSpent() {
      return this.noDonoCaught * this.ratioNoDonator;
    },
    ratioDonator() {
      return this.actualEggs > 0 ? this.actualEggs / this.donatorOdds : 0;
    },
    donoCaughtSpent() {
      return this.donoCaught * this.ratioDonator;
    },
    ratioDonatorCharm() {
      return this.actualEggs > 0 ? this.actualEggs / this.shinyCharmOdds : 0;
    },
    donoCharmCaughtSpent() {
      return this.donoCharmCaught * this.ratioDonatorCharm;
    },
    noDonoBoughtSpent() {
      return this.noDonoBought * this.ratioNoDonator;
    },
    donoBoughtSpent() {
      return this.donoBought * this.ratioDonator;
    },
    donoCharmBoughtSpent() {
      return this.donoCharmBought * this.ratioDonatorCharm;
    },
    // Other computed properties...
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
      this.totalNetballCost = (this.eggs * this.netballCost) / this.netballCatchRate; // Calculate Total Netball Cost
      this.totalPokeballCost = this.eggs * this.pokeballCost; // Calculate Total Pokeball Cost
      this.totalBallCost = this.totalNetballCost + this.totalPokeballCost; // Calculate Total Ball Cost
      this.totalMailingCost = (this.eggs / 5) * this.mailingFee; // Calculate Total Mailing Cost
      this.totalBatchCost = this.totalBallCost + this.totalMailingCost + this.shinyCharmCost; // Calculate Total Batch Cost (Catching)
      this.totalBatchBuyingCost = (this.totalPokeballCost + (this.dittoBoxCost * (this.eggs / 60)) + this.shinyCharmCost); // Calculate Total Batch Cost (Buying)

      this.batchesNoDonator = this.noDonatorOdds / (this.eggs || 1); // Calculate Batches for No Donator Status
      this.batchesDonator = this.donatorOdds / (this.eggs || 1); // Calculate Batches for Donator Status
      this.batchesShinyCharm = this.shinyCharmOdds / (this.eggs || 1); // Calculate Batches for Donator + Shiny Charm

      // Average Total Per Shiny Calculations
      this.noDonoCaught = (this.totalBatchCost - this.shinyCharmCost) * this.batchesNoDonator;
      this.donoCaught = (this.totalBatchCost - this.shinyCharmCost) * this.batchesDonator + (this.donatorStatusCost * this.monthsSpent);
      this.donoCharmCaught = (this.totalBatchCost * this.batchesShinyCharm) + (this.donatorStatusCost * this.monthsSpent);

      // Average Total Per Shiny Bought Calculations
      this.noDonoBought = (this.totalBatchBuyingCost - this.shinyCharmCost) * this.batchesNoDonator;
      this.donoBought = (this.totalBatchBuyingCost - this.shinyCharmCost) * this.batchesDonator + (this.donatorStatusCost * this.monthsSpent);
      this.donoCharmBought = (this.totalBatchBuyingCost * this.batchesShinyCharm) + (this.donatorStatusCost * this.monthsSpent);
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
