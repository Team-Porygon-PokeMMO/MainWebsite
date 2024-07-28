<script lang="ts">
import hoennEliteFour from '~/src/EliteFour/hoenn.json'
import kantoEliteFour from '~/src/EliteFour/kanto.json'
import johtopEliteFour from '~/src/EliteFour/johto.json'
import sinnohEliteFour from '~/src/EliteFour/sinnoh.json'
import unovaEliteFour from '~/src/EliteFour/unova.json'
import { Region } from '~/types/EliteFour.types.vue'

export default {
    data() {
        return {
            regions: [kantoEliteFour, johtopEliteFour, hoennEliteFour, sinnohEliteFour, unovaEliteFour] as Region[],
        };
    },
    methods: {
        toggleView(option: any) {
            option.IsVisible = !option.IsVisible
        },
    },
    
};
</script>

<style>
/* Menu styles */
.menu {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-label {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.menu-list {
    list-style: none;
}

.menu-list li {
    margin-bottom: 10px;
}

.menu-list a {
    display: block;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.menu-list a:hover {
    background-color: grey;
}

/* Expansion styles */
.expansion {
    margin-top: 10px;
    background-color: #f0f0f0;
    border-radius: 4px;
    padding: 10px;
}

.expansion ul {
    list-style: none;
    padding: 0;
}

.expansion li {
    margin-bottom: 5px;
}

.expansion a {
    text-decoration: none;
}

.expansion a:hover {
    text-decoration: underline;
}

.strong {
    font-weight: bold;
}

/* Responsive styles */
@media (max-width: 768px) {
    .menu {
        padding: 10px;
    }

    .menu-list a {
        padding: 8px;
    }
}
</style>

<template>
    <UContainer>
        <UCard>
            <div class="p-2">
                <h2>Elite Four</h2>
            </div>
            <aside class="menu p-5 m-0">
                <p class="menu-label">
                    Region
                </p>
                <ul class="menu-list m-2">
                    <!-- region options -->
                    <li v-for="region in regions" :key="region.Name">
                        <a class="m-0" @click="toggleView(region)">{{ region.Name }} {{ region.IsVisible ?
                            "🔽" : "▶" }}</a>
                        <div v-show="region.IsVisible" class="pl-6">
                            <ul>
                                <li v-for="gymTrainer in region.GymTrainers" :key="gymTrainer.Name">
                                    <a @click="toggleView(gymTrainer)">{{ gymTrainer.Name }} {{ gymTrainer.IsVisible ?
                                        "🔽" : "▶" }}</a>
                                    <div v-show="gymTrainer.IsVisible" class="pl-6">
                                        <ul>
                                            <li v-for="lead in gymTrainer.Leads" :key="lead.Name">
                                                <a @click="toggleView(lead)">{{ lead.Name }} {{ lead.IsVisible ? "🔽" :
                                                    "▶" }}</a>
                                                <div v-show="lead.IsVisible">
                                                    <Steps v-for="(step, index) in lead.Steps" :currentStep="step"/>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </aside>
        </UCard>
    </UContainer>
</template>