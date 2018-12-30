<template>
  <div
    class="container centered"
    v-bind:class="{relaxing: isRelaxing}"
  >
    <div class="title centered">
      <span class="counter" v-if="counter">Pomidorko #{{counter}}</span>
      <span class="counter" v-else></span>
    </div>
    <div id="timer">
      <span id="minutes">{{minutes}}</span>
      <span id="divider">:</span>
      <span id="seconds">{{seconds}}</span>
    </div>
    <div class="message centered">
      <span>{{title}}</span>
    </div>
    <div id="controls" class="centered">
      <button
        id="run"
        class="button"
        v-bind:class="{relaxing: isRelaxing}"
        v-if="!timer"
        @click="run"
      >
        {{buttonName}}
      </button>
      <button
        id="pause"
        class="button"
        v-bind:class="{relaxing: isRelaxing}"
        v-if="timer"
        @click="pause"
      >
        Pause
      </button>
      <button
        id="reset"
        class="button"
        v-bind:class="{
          disabled: !resetButton,
          relaxing: isRelaxing,
        }"
        @click="reset"
        :disabled="!resetButton"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script>
  import * as R from 'ramda';

  export default {
    name: 'app',
    data () {
      const SESSION_DURATION = 25;
      const RELAX_DURATION = 5;
      return {
        counter: 0,
        timer: null,
        isRelaxing: false,
        SESSION_DURATION,
        RELAX_DURATION,
        sessionTime: this.minutesToSeconds(SESSION_DURATION),
        resetButton: false,
        buttonName: "Start",
        title: "Start working session!",
      };
    },

    methods: {
      run: function() {
        this.timer = setInterval(() => this.countdown(), 1000);
        this.resetButton = true;
        this.title = this.getTitle();
        this.counter = this.buttonName === "Resume" ? this.counter : R.inc(this.counter);
        this.buttonName = "Pause";
      },
      pause: function() {
        clearInterval(this.timer);
        this.timer = null;
        this.resetButton = true;
        this.buttonName = "Resume";
        this.title = "Keep going!";
      },
      reset: function() {
        clearInterval(this.timer);
        this.sessionTime = this.minutesToSeconds(this.SESSION_DURATION);
        this.counter = 0;
        this.resetButton = false;
        this.isRelaxing = false;
        this.buttonName = "Start";
        this.timer = null;
        this.title = "Start working session!";
      },
      relax: function() {
        clearInterval(this.timer);
        this.sessionTime = this.minutesToSeconds(this.RELAX_DURATION);
        this.timer = setInterval(() => this.countdown(), 1000);
        this.isRelaxing = true;
        this.buttonName = "Continue";
        this.title = this.getTitle();
      },
      countdown: function() {
        if(this.sessionTime >= 1) {
          this.sessionTime = R.dec(this.sessionTime);
        } else if (this.sessionTime < 1 && !this.isRelaxing) {
          this.relax();
        } else {
          clearInterval(this.timer);
          this.sessionTime = this.minutesToSeconds(this.SESSION_DURATION);
          this.isRelaxing = false;
          this.run();
        }
      },
      prepareTime: function(time) {
        return (time < 10 ? '0' : '') + time;
      },
      minutesToSeconds: R.multiply(60),
      secondsToMinutes: R.divide(R.__, 60),
      getTitle: function() {
        return this.isRelaxing ? "Relax, Take it easy" : "Work hard, Play hard!";
      },
    },

    computed: {
      minutes: function() {
        const minutes = Math.floor(this.secondsToMinutes(this.sessionTime));
        return this.prepareTime(minutes);
      },
      seconds: function() {
        const seconds = this.sessionTime - this.minutesToSeconds(this.minutes);
        return this.prepareTime(seconds);
      }
    }
  }
</script>


<style>
  html, body {
    height: 100%;
    display: contents;
  }

  .centered {
    display: flex;
    justify-content: center;
  }

  .container {
    background: #DD444B;
    height: 100%;
    color: white;
    justify-content: space-around;
    flex-direction: column;
  }

  .title {
    font-size: 3vw;
    height: 50px;
  }

  .message {
    font-size: 5vw;
  }

  #controls {
    justify-content: space-evenly;
  }

  #timer {
    font-size: 20vw;
    font-family: Verdana, Geneva, sans-serif;
    text-align: center;
  }

  button {
    width: 20vw;
    height: 5vw;
    border-radius: 5px;
    background: #dd444b;
    color: white;
    border: 2px solid;
    font-variant-caps: all-petite-caps;
    font-size: 2vw;
    cursor: pointer;
    outline: none;
  }

  .disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .relaxing {
    background: #5ba36e;
  }

  .button:hover {
    opacity: 0.5;
  }

  .button:active {
    transform: translateY(2px);
  }
</style>
