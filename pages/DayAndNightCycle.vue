<script lang="ts">
function convertDateToUTC(date: Date) { return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); }
let currentTime = convertDateToUTC(new Date());

function addHoursToDate(date: Date, hours: number){
    const newHours = date.getHours() + hours;
    date.setHours(newHours);
    return date;
}

// 1:00 Morning 2:45 Day 5:15 Night 7:00 Morning
let morningStart: Date = new Date(currentTime);
morningStart.setHours(1);
morningStart.setMinutes(0);
morningStart.setSeconds(0);
let dayStart: Date = new Date(currentTime);
dayStart.setHours(2);
dayStart.setMinutes(45);
dayStart.setSeconds(0);
let nightStart: Date = new Date(currentTime);
nightStart.setHours(5);
nightStart.setMinutes(15);
nightStart.setSeconds(0);
let dayEnd: Date = new Date(currentTime);
dayEnd.setHours(7);
dayEnd.setMinutes(0);
dayEnd.setSeconds(0);

if(currentTime >= dayEnd){
    const getCycle = Math.floor(currentTime.getHours() / 6)
    morningStart = addHoursToDate(morningStart, 6 * getCycle);
    dayStart = addHoursToDate(dayStart, 6 * getCycle);
    nightStart = addHoursToDate(nightStart, 6 * getCycle);
    dayEnd = addHoursToDate(dayEnd, 6 * getCycle);
}

if(currentTime >= morningStart && currentTime >= dayStart){
    morningStart = addHoursToDate(morningStart, 6);
}
if(currentTime >= dayStart && currentTime >= nightStart){
    dayStart = addHoursToDate(dayStart, 6);
}
if(currentTime >= nightStart && currentTime >= dayEnd){
    nightStart = addHoursToDate(nightStart, 6);
}
if(currentTime >= dayEnd){
    dayEnd = addHoursToDate(dayEnd, 6);
}

enum Cycle {
    MORNING = 'Morning 🌅',
    DAY = 'Day ☀️',
    NIGHT = 'Night 🌚'
}

function getNextCycles(){
    let cycles = [
        { cycle: Cycle.MORNING, time: morningStart, current: morningStart <= currentTime && currentTime < dayStart},
        { cycle: Cycle.DAY, time: dayStart, current: dayStart <= currentTime && currentTime < nightStart},
        { cycle: Cycle.NIGHT, time: nightStart, current: nightStart <= currentTime && currentTime < dayEnd},
    ];
    return cycles;
}

export default {
    data() {
        return {
            moves: [] as any,
            abilities: [] as any,
        };
    },
    computed: {
        currentTime : () => currentTime
    },
    methods: {
        getNextCycles,
        getTimeLeft(toCalculateDate: Date){
            const diff = toCalculateDate.getTime() - currentTime.getTime();
            const hours = Math.floor(diff / 1000 / 60 / 60);
            const minutes = Math.floor(diff / 1000 / 60 % 60);
            if(hours <= 0){
                return `Started ${Math.abs(minutes)} minutes ago.`;
            }
            return `in ${hours} hours and ${minutes} minutes`;
        },
        refreshCurrentTime(){
            currentTime = convertDateToUTC(new Date());
        }
    },
};
</script>

<template>
    <div class="container mx-auto">
        <h1>Day and Night Cycle</h1>
        <h2>Current Cycle: {{ currentTime }}</h2>
        <h2 v-for="cycle in getNextCycles()" :key="cycle.cycle" :class="{ isActive: cycle.current }">
            {{ cycle.cycle }} {{ getTimeLeft(cycle.time) }} {{ cycle.current ? '(Current)' : '' }}
        </h2>
        <UButton @click="refreshCurrentTime()">Refresh</UButton>
    </div>
</template>