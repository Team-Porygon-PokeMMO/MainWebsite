<template>
    <div class="text-center">
        <!-- Table Layout for Weekly Farms and Tri-Monthly -->
        <table class="table-auto mx-auto mt-4">
            <thead>
                <tr>
                    <th class="text-xl p-2">Weekly Farms</th>
                    <th class="text-xl p-2">Tri-Monthly</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <!-- Weekly Farms Section -->
                    <td @click="toggleHoOh" class="cursor-pointer text-center p-4">
                        <div class="category-box border border-black p-2 hover:bg-cyan-700">
                            <span class="bg-black bg-opacity-50 text-white p-1">Weekly Farms</span>
                            <div class="category-image" :style="getImageStyling(weeklyFarms)"></div>
                        </div>
                    </td>

                    <!-- Tri-Monthly Section -->
                    <td @click="toggleLugia" class="cursor-pointer text-center p-4">
                        <div class="category-box border border-black p-2 hover:bg-cyan-700">
                            <span class="bg-black bg-opacity-50 text-white p-1">Tri-Monthly</span>
                            <div class="category-image" :style="getImageStyling(triMonthly)"></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Expanded Section: Ho-Oh Image(s) -->
        <div v-if="showHoOh" class="mt-4">
            <div class="grid grid-cols-5 gap-2">
                <div @click="toggleHoOhSteps" class="cursor-pointer hooh-box border border-black p-2 hover:bg-cyan-700"
                    :class="{ active: showHoOhSteps }" :style="getImageStyling(hooh)">
                    <span class="bg-black bg-opacity-50 text-white p-1">{{ hooh.Name }}</span>
                </div>
            </div>
        </div>

        <!-- Expanded Section: Lugia Image(s) -->
        <div v-if="showLugia" class="mt-4">
            <div class="grid grid-cols-5 gap-2">
                <div @click="toggleLugiaSteps" class="cursor-pointer lugia-box border border-black p-2 hover:bg-cyan-700"
                    :class="{ active: showLugiaSteps }" :style="getImageStyling(lugia)">
                    <span class="bg-black bg-opacity-50 text-white p-1">{{ lugia.Name }}</span>
                </div>
            </div>
        </div>

        <!-- Steps Box for Ho-Oh -->
        <div v-if="showHoOhSteps" class="trainer-box p-4 mt-4">
            <h3 class="text-center">{{ hooh.GymTrainers[0].Name }}</h3>
            <div class="menu-list">
                <div v-for="(lead, leadIndex) in hooh.GymTrainers[0].Leads" :key="leadIndex">
                    <h4 class="text-lg font-bold">{{ lead.Name }}</h4>
                    <ul class="ml-4">
                        <li v-for="(step, stepIndex) in lead.Steps" :key="stepIndex" class="mb-2">
                            {{ step.Description }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Steps Box for Lugia -->
        <div v-if="showLugiaSteps" class="trainer-box p-4 mt-4">
            <h3 class="text-center">{{ lugia.GymTrainers[0].Name }}</h3>
            <div class="menu-list">
                <div v-for="(lead, leadIndex) in lugia.GymTrainers[0].Leads" :key="leadIndex">
                    <h4 class="text-lg font-bold">{{ lead.Name }}</h4>
                    <ul class="ml-4">
                        <li v-for="(step, stepIndex) in lead.Steps" :key="stepIndex" class="mb-2">
                            {{ step.Description }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import hooh from '~/src/Weeklys/hooh.json';
import lugia from '~/src/TriMonthly/lugia.json'; // Example for Tri-Monthly

export default {
    data() {
        return {
            hooh, // Load Ho-Oh JSON
            lugia, // Load Lugia JSON
            weeklyFarms: {
                Image: "/images/weeklys/weekly_farms.png", // Weekly Farms Image
                ImagePosition: "center"
            },
            triMonthly: {
                Image: "/images/weeklys/tri_monthly.png", // Tri-Monthly Image
                ImagePosition: "center"
            },
            showHoOh: false, // Controls expansion to show Ho-Oh
            showLugia: false, // Controls expansion to show Lugia
            showHoOhSteps: false, // Controls visibility of Ho-Oh steps
            showLugiaSteps: false // Controls visibility of Lugia steps
        };
    },
    methods: {
        toggleHoOh() {
            this.showHoOh = !this.showHoOh; // Toggle expansion for Ho-Oh
            if (!this.showHoOh) this.showHoOhSteps = false; // Close steps if collapsing
        },
        toggleLugia() {
            this.showLugia = !this.showLugia; // Toggle expansion for Lugia
            if (!this.showLugia) this.showLugiaSteps = false; // Close steps if collapsing
        },
        toggleHoOhSteps() {
            this.showHoOhSteps = !this.showHoOhSteps; // Toggle steps visibility
        },
        toggleLugiaSteps() {
            this.showLugiaSteps = !this.showLugiaSteps; // Toggle steps visibility
        },
        getImageStyling(item: any) {
            return {
                backgroundImage: `url(${item.Image})`,
                backgroundSize: "cover",
                backgroundPosition: item.ImagePosition,
                height: "100px",
                width: "100%"
            };
        }
    }
};
</script>

<style>
.category-box {
    display: inline-block;
    width: 200px;
    text-align: center;
}

.category-image {
    height: 100px;
    background-size: cover;
    background-position: center;
}

.hooh-box, .lugia-box {
    height: 100px;
    background-size: cover;
    background-position: center;
    text-align: center;
}

.trainer-box {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    padding: 15px;
    margin-top: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 20px;
    text-align: center;
}
</style>
