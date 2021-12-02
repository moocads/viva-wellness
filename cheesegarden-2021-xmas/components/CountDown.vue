<template>
  <countdown :time="time">
    <template slot-scope="props">
      <div class="mooc-center text-center p-0" v-if="props.totalSeconds">
        <ul class="count">
          <li class="count-board">
            <p class="numbers days">{{ props.days }}</p>
            <p class="strings timeRefDays">Days</p>
          </li>
          <li class="count-board">
            <p class="numbers days">{{ props.hours }}</p>
            <p class="strings timeRefDays">hours</p>
          </li>
          <li class="count-board">
            <p class="numbers days">{{ props.minutes }}</p>
            <p class="strings timeRefDays">minutes</p>
          </li>
          <li class="count-board">
            <p class="numbers days">{{ props.seconds }}</p>
            <p class="strings timeRefDays">seconds</p>
          </li>
        </ul>
      </div>
    </template>
  </countdown>
</template>

<script>
export default {
  data() {
    let time = new Date(2021, 4, 1, 11, 0, 0, 0).valueOf() - new Date().valueOf();
    if (time < 0) {
      time = 0;
    }
    return {
      time: time
    };
  }
};
</script>

<style lang="scss" scoped>
.count {
  padding: 0;
  display: inline-flex;
  justify-content: center;
  margin: 15px auto;
  text-align: center;
}
.count-board {
  background-color: $yellow;
  padding: 0px 15px;
  color: #ffffff;
  border-radius: 10px;
  margin: 15px;
  width: 118px;

  .numbers {
    font-size: 65px;
    display: block;
    position: relative;
    text-align: center;
    font-weight: 700;
  }
  .strings {
    font-size: 18px;
    font-weight: 700;
    display: block;
    position: relative;
    text-align: center;
    text-transform: uppercase;
  }
}

@media screen and (max-width: 767px) {
  .count {
    margin: 10px auto;
    padding: 0;
    list-style: none;
  }
  .count-board {
    padding: 0px 5px;
    border-radius: 10px;
    width: 70px;
    margin: 5px;

    .numbers {
      font-size: 35px;
      margin: 0;
    }
    .strings {
      font-size: 12px;
    }
  }
}
</style>
