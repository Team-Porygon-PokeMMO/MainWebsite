<script lang="ts">
export class Region {
    Name: string = "";
    IsVisible: boolean = false;
    GymTrainers: Trainer[] = [];
}
export class Trainer {
    Name: string = "";
    IsVisible: boolean = false;
    Leads: Lead[] = [];
}
export class Lead {
    Name: string = "";
    IsVisible: boolean = false;
    Steps: Step[] = [];
}
export class Step {
    Description: string = "";
    Classes: string[] = [];
    Steps: Step[] = [];
    IsVisible: boolean = false;
}
export default {
    props: {
        current: {
            type: Region,
            required: true,
        },
    },
    methods: {
        toggleView() {
            this.current.IsVisible = !this.current.IsVisible
        },
        getIfExpandable() {
            if (this.current?.GymTrainers?.length > 0) {
                return this.current?.IsVisible ? '🔽' : '▶️'
            }
            return ''
        }
    },
};
</script>

<style scoped>
.link {
    color: lightblue;
    cursor: pointer;
}
</style>

<template>
    <div class="pl-2 pt-1">
        <ul>
            <li @click="toggleView()">
                {{ current.Name }} {{ getIfExpandable() }}
            </li>
        </ul>
        <Trainers v-for="trainer in current.GymTrainers" :current="trainer" v-show="current.IsVisible" />
    </div>
</template>
