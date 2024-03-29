<script setup lang="ts">
function convertDateToUTC(date) { return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); }
const currentTime = convertDateToUTC(new Date());
const [currentTimeHours, currentTimeMinutes, currentTimeSeconds] = [currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()];
const currentTimeInInt = currentTimeHours + (currentTimeMinutes / 60) + (currentTimeSeconds / 3600);

enum Cycle {
    MORNING = 'Morning 🌅',
    DAY = 'Day ☀️',
    NIGHT = 'Night 🌚'
}

function fromIntToTime(int: number) {
    const hours = Math.floor(int);
    const minutes = Math.floor((int - hours) * 60);
    const seconds = Math.floor(((int - hours) * 60 - minutes) * 60);
    return [hours, minutes, seconds];
}

function getCurrentGameTimes() {
    return fromIntToTime(currentTimeInInt * 4)
}

function formatTimeFromList(timeList: number[]) {
    return `${(timeList[0] > 0 ? timeList[0] + 'hrs ' : '')}${(timeList[1] > 0 ? timeList[1] + 'mins ' : '')}${(timeList[2] > 0 ? timeList[2] + 'secs' : '')}`
}

function getRealTimeForNextGivenHour(hour: number) {
    let realTimeGivenHour = hour
    if (getCurrentGameTimes()[0] >= realTimeGivenHour) {
        realTimeGivenHour += 24
    }
    const realTimeGivenHourInInt = (realTimeGivenHour / 4) - currentTimeInInt
    return formatTimeFromList(fromIntToTime(realTimeGivenHourInInt))
}

function getFormattedCurrentGameTime() {
    return formatTimeFromList(getCurrentGameTimes())
}

function getCurrentCycle(){
    const [currentGameHours,currentGameMinutes] = getCurrentGameTimes()
    const currentGameTimeInInt = currentGameHours + (currentGameMinutes / 60)
    if(currentGameTimeInInt >= 4 && currentGameTimeInInt <= 10){
        return Cycle.MORNING
    }else if(currentGameTimeInInt > 10 && currentGameTimeInInt <= 21){
        return Cycle.DAY
    }else{
        return Cycle.NIGHT
    }
}

function getNextCycles(){
    return [
        {
            cycle: Cycle.MORNING,
            time: getRealTimeForNextGivenHour(4),
            current: getCurrentCycle() === Cycle.MORNING
        },
        {
            cycle: Cycle.DAY,
            time: getRealTimeForNextGivenHour(10),
            current: getCurrentCycle() === Cycle.DAY
        },
        {
            cycle: Cycle.NIGHT,
            time: getRealTimeForNextGivenHour(21),
            current: getCurrentCycle() === Cycle.NIGHT
        }
    ]
}
</script>

<template>
    <div class="container mx-auto">
        <h1>Day and Night Cycle</h1>
        <h2>Current In-Game Time: {{ getFormattedCurrentGameTime() }}</h2>
        <h2 v-for="cycle in getNextCycles()" :key="cycle.cycle">
            {{ cycle.cycle }} in {{ cycle.time }} {{ cycle.current ? '(Current)' : '' }}
        </h2>
        <br/>
        <h3>Information:</h3>
        <p>One In-Game Hour equals to 15 Real Life Minutes</p>
        <p>Morning starts at 4:00, Day at 10:00 and Night at 21:00.</p>
    </div>
</template>