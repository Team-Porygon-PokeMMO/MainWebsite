<template>
    <UContainer>
        <h1>Hatch Cycle Timer</h1>
        <p v-if="currentTime != null">Current Time: {{ currentTime.toLocaleTimeString() }}</p>
        <br/>
        <p>Egg Hatch Second: <b>{{ eggHatchSecond }}</b></p>
        <UInput v-model="eggHatchSecond"/>
        <br/>
        <p>Timer (starts from last Egg Hatch Second): </p>
        <UInput v-model="pingMinute" type="number" placeholder="Minutes" />
        <UInput v-model="pingSecond" type="number" placeholder="Seconds" />
        <br/>
        <UButton @click="startTimer()">Start</UButton>
        <UButton @click="missedInterval()">Missed Interval</UButton>
        <UContainer v-if="timerSet">
        <h1 v-if="endTimer != null">End Timer: {{ endTimer.toLocaleTimeString() }}</h1>
        <h1>Timer ends in {{ remainingTimer }}.</h1>
        </UContainer>
    </UContainer>
</template>

<script lang="ts">
let currentTimer = null
let endTimer = null
export default {
    data() {
        return {
            currentTime: null,
            endTimer: new Date(),
            timerSet: false,
            pingMinute: 0,
            pingSecond: 0,
            eggHatchSecond: 6,
            remainingTimer: ''
        };
    },
    mounted() {
        this.updateTime();
        setInterval(this.updateTime, 1000);
    },
    methods: {
        updateTime() {
            this.currentTime = new Date();
            if(this.timerSet){
                this.checkTimer()
            }
        },
        checkTimer(){
            if(this.endTimer == ''){
                return
            }
            let currentTime = new Date(this.currentTime)
            let endTimer = new Date(this.endTimer)
            let diff = endTimer.getTime() - currentTime.getTime();
            if(diff <= 0){
                this.startTimer()
                return
            }
            let minutes = Math.floor(diff / 1000 / 60 % 60);
            let seconds = Math.floor(diff / 1000 % 60);
            this.remainingTimer = (minutes > 0 ? `${minutes} minutes and ` : '') + `${seconds} seconds`
        },
        startTimer(){
            let startTimer = new Date()
            let eggHatchSecond = this.eggHatchSecond
            if(startTimer.getSeconds() < eggHatchSecond){
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
        missedInterval(){
            let endTimer = new Date(this.endTimer)
            this.addMinutesToDate(endTimer, 1)
            this.endTimer = endTimer
        },
        sendAlert(){
            alert('Timer Ended')
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
button{
    margin: 0 .25rem
}
</style>