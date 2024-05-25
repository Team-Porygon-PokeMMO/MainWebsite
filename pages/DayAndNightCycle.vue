<script lang="ts">
enum Cycle {
    MORNING = 'Morning 🌅',
    DAY = 'Day ☀️',
    NIGHT = 'Night 🌚'
}

function addZ(n: number) { return n < 10 ? '0' + n : '' + n; }

function hoursToSeconds(hours: number) {
    return hours * 3600
}

function getUtcTotalSeconds(currentTime: Date) {
    return (currentTime.getUTCHours() * 3600) + (currentTime.getUTCMinutes() * 60) + currentTime.getSeconds()
}

function calculateInGameHours(utcTotalSeconds: number): number {
    let inGameTotalSeconds = utcTotalSeconds % hoursToSeconds(6)
    return (inGameTotalSeconds / hoursToSeconds(1)) * 4
}

function calculateInGameClock(utcTotalSeconds: number): string {
    let inGameHours = calculateInGameHours(utcTotalSeconds)
    let inGameMinutes = inGameHours % 1 * 60

    return (addZ(Math.floor(inGameHours)) + ":" + addZ(Math.floor(inGameMinutes)))
}

function calculateInGameTime(getUtcTotalSeconds: number): number {
    let totalInGameSeconds = getUtcTotalSeconds % hoursToSeconds(6)

    return (totalInGameSeconds / hoursToSeconds(1)) * 4
}

export default {
    data() {
        return {
            currentGameClock: "",
            currentGameTime: ""
        };
    },
    beforeMount() {
        setInterval(() => {
            console.dir("running")
            this.getCurrentGameClock();
            this.getCurrentGameTime();
        }, 1000)
    },
    methods: {
        getCurrentGameClock: function () {
            let inGameHours = calculateInGameHours(getUtcTotalSeconds(new Date()))
            let inGameMinutes = inGameHours % 1 * 60
            this.currentGameClock = (addZ(Math.floor(inGameHours)) + ":" + addZ(Math.floor(inGameMinutes)))
        },
        getCurrentGameTime: function () {
            let inGameHours: number = calculateInGameTime(getUtcTotalSeconds(new Date()))
            let newCurrentGameTime = ""
            if (inGameHours < 4)
                newCurrentGameTime = Cycle.NIGHT
            else if (inGameHours < 11)
                newCurrentGameTime = Cycle.MORNING
            else if (inGameHours < 21)
                newCurrentGameTime = Cycle.DAY
            newCurrentGameTime = Cycle.NIGHT
            this.currentGameTime = newCurrentGameTime
        }
    }
};
</script>

<template>
    <div class="container mx-auto">
        <h1>Current PokeMMO Time</h1>
        <h2>
            {{ currentGameClock }}
        </h2>
        <h2>
            {{ currentGameTime }}
        </h2>
    </div>
</template>

<style scoped>
.isActive {
    color: lightcoral;
}
</style>