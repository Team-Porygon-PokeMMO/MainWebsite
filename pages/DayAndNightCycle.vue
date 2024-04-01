<script lang="ts">
enum Cycle {
    MORNING = 'Morning 🌅',
    DAY = 'Day ☀️',
    NIGHT = 'Night 🌚'
}

function convertDateToUTC(date: Date) { return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); }
let currentTime = convertDateToUTC(new Date());


function addHoursToDate(date: Date, hours: number) {
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
let currentCycle: Cycle = Cycle.MORNING;

if (currentTime <= morningStart) {
    currentCycle = Cycle.NIGHT;
}
else {
    if (currentTime >= dayEnd) {
        const getCycle = Math.floor(currentTime.getHours() / 6)
        morningStart = addHoursToDate(morningStart, 6 * getCycle);
        dayStart = addHoursToDate(dayStart, 6 * getCycle);
        nightStart = addHoursToDate(nightStart, 6 * getCycle);
        dayEnd = addHoursToDate(dayEnd, 6 * getCycle);
    }

    if (currentTime >= morningStart && currentTime >= dayStart) {
        morningStart = addHoursToDate(morningStart, 6);
    }
    if (currentTime >= dayStart && currentTime >= nightStart) {
        dayStart = addHoursToDate(dayStart, 6);
    }
    console.dir(dayEnd)
    if (currentTime >= nightStart && currentTime >= morningStart) {
        nightStart = addHoursToDate(nightStart, 6);
    }
    if (currentTime >= dayEnd) {
        dayEnd = addHoursToDate(dayEnd, 6);
    }
}

function getNextCycles() {
    let cycles = [
        { cycle: Cycle.MORNING, time: morningStart, current: currentCycle === Cycle.MORNING},
        { cycle: Cycle.DAY, time: dayStart, current: currentCycle === Cycle.DAY},
        { cycle: Cycle.NIGHT, time: nightStart, current: currentCycle === Cycle.NIGHT},
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
        currentTime: () => currentTime
    },
    methods: {
        getNextCycles,
        getTimeLeft(cycle: Cycle, toCalculateDate: Date) {
            let diff = toCalculateDate.getTime() - currentTime.getTime();
            let hours = Math.floor(diff / 1000 / 60 / 60);
            let minutes = Math.floor(diff / 1000 / 60 % 60);
            if (cycle == currentCycle) {
                let nextCycleStart = dayStart
                switch(cycle){
                    case Cycle.MORNING:
                        nextCycleStart = dayStart;
                        break
                    case Cycle.DAY:
                        nextCycleStart = nightStart;
                        break
                    case Cycle.NIGHT:
                        nextCycleStart = morningStart;
                        break
                }

                diff = nextCycleStart.getTime() - currentTime.getTime();
                hours = Math.floor(diff / 1000 / 60 / 60);
                minutes = Math.floor(diff / 1000 / 60 % 60);
                return 'ends in ' + (hours == 0 ? `in ${minutes} minutes` : `in ${hours} hours and ${minutes} minutes`) + '.';
            }
            return 'in ' + (hours == 0 ? `${minutes} minutes` : `${hours} hours and ${minutes} minutes`) + '.';
        }
    },
};
</script>

<template>
    <div class="container mx-auto">
        <h1>Day and Night Cycle</h1>
        <h2 v-for="cycle in getNextCycles()" :key="cycle.cycle" :class="{ isActive: cycle.current }">
        {{ cycle.cycle }} {{ getTimeLeft(cycle.cycle, cycle.time) }} 
        </h2>
    </div>
</template>

<style scoped>
.isActive{
    color: lightcoral;
}
</style>