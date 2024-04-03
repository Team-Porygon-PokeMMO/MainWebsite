<script lang="ts">
let currentTimer: Date | null = null
let endTimer: Date | null = null
let volume = 50
let timer = null
export default {
    data() {
        return {
            currentTimer: new Date(),
            endTimer: new Date(),
            timerSet: false,
            pingMinute: 0,
            pingSecond: 0,
            eggHatchSecond: 6,
            remainingTimer: '',
            volume: 50,
        };
    },
    mounted() {
        this.updateTime();
        timer = setInterval(this.updateTime, 200);
    },
    methods: {
        updateTime() {
            this.currentTimer = new Date();
            if (this.timerSet) {
                this.checkTimer()
            }
        },
        checkTimer() {
            if (this.endTimer == null) {
                return
            }
            let currentTimer = new Date(this.currentTimer)
            let endTimer = new Date(this.endTimer)
            let diff = endTimer.getTime() - currentTimer.getTime();
            if (diff <= 0) {
                this.sendAlert()
                this.startTimer()
                return
            }
            let minutes = Math.floor(diff / 1000 / 60 % 60);
            let seconds = Math.floor(diff / 1000 % 60);
            this.remainingTimer = (minutes > 0 ? `${minutes} minutes and ` : '') + `${seconds} seconds`
        },
        startTimer() {
            let startTimer = new Date()
            let eggHatchSecond = this.eggHatchSecond
            if (startTimer.getSeconds() < eggHatchSecond) {
                this.removeMinutesToDate(startTimer, 1)
            }
            this.setSecondsToDate(startTimer, eggHatchSecond)

            let pingMinute = this.pingMinute
            let pingSecond = this.pingSecond

            let endTimer = new Date(startTimer)
            this.addMinutesToDate(endTimer, pingMinute)
            this.addSecondsToDate(endTimer, pingSecond)
            this.endTimer = endTimer;
            this.timerSet = true
        },
        addMinutesToDate(date: Date, minutes: number) {
            date.setMinutes(date.getMinutes() + minutes);
        },
        removeMinutesToDate(date: Date, minutes: number) {
            date.setMinutes(date.getMinutes() - minutes);
        },
        setSecondsToDate(date: Date, seconds: number) {
            date.setSeconds(seconds);
        },
        addSecondsToDate(date: Date, seconds: number) {
            date.setSeconds(date.getSeconds() + seconds);
        },
        missedInterval() {
            let endTimer = new Date(this.endTimer)
            this.addMinutesToDate(endTimer, 1)
            this.endTimer = endTimer
        },
        sendAlert() {
            if (this.timerSet) {
                this.playAudio()
            }
        },
        playAudio() {
            const audio = new Audio('https://cdn.freesound.org/previews/352/352651_4019029-lq.ogg');
            audio.volume = this.volume / 100;
            audio.play();
        },
        stopTimer() {
            this.endTimer = new Date()
            this.timerSet = false
        }
    }
};
</script>

<style scoped>
h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

p {
    font-size: 18px;
}

button {
    margin: 0 .25rem
}
</style>

<template>
    <UContainer>
        <div>
            <h1>Hatch Cycle Timer</h1>
            <div class="grid gap-2 mb-2 md:grid-cols-1 text-center">
                <h1 v-if="currentTimer != null">Current Time: {{ currentTimer.toLocaleTimeString() }}</h1>
            </div>
            <div class="grid gap-2 mb-2 md:grid-cols-1">
                <label>Egg-Hatching Second:</label>
                <UInput v-model="eggHatchSecond" />
            </div>
            <h2>Timer (starts from last Egg Hatch Second): </h2>
            <div class="grid gap-4 mb-2 md:grid-cols-2">
                <div>
                    <label>Minutes</label>
                    <UInput v-model="pingMinute" type="number" placeholder="Minutes" />
                </div>
                <div>
                    <label>Seconds</label>
                    <UInput v-model="pingSecond" type="number" placeholder="Seconds" />
                </div>
                <div>
                    <UButton @click="startTimer()">Start</UButton>
                    <UButton @click="stopTimer()">Stop</UButton>
                    <UButton @click="missedInterval()">Missed Interval</UButton>
                </div>
            </div>
            <div class="grid md:grid-cols-1" v-if="timerSet">
                <div class="text-center">
                    <h1 v-if="endTimer != null">End Timer: {{ endTimer.toLocaleTimeString() }}</h1>
                </div>
                <div class="text-center">
                    <h3>Timer ends in {{ remainingTimer }}.</h3>
                </div>
            </div>
            <h1>Notification Style:</h1>
            <div class="grid gap-2 mb-2 md:grid-cols-1">
                <div>
                    <label for="default-range"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Audio
                        Volume</label>
                    <input id="default-range" v-model="volume" type="range"
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                </div>
                <div>
                    <UButton @click="playAudio()">Test Audio</UButton>
                </div>
            </div>
        </div>
    </UContainer>
</template>