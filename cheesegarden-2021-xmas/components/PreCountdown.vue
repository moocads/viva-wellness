<template>
  <div id="preCountdown">
    <section class="hero">
      <img src="/precountdown/banner.jpg" alt="Cheese Garden">
    </section>
    <section class="main">
      <div class="internalWrapper">
        <div class="disclaimer">
          <p>
            Pre-orders will open on <span class="bold">May 1<sup>st</sup></span> and will be delivered or available for pickup from <span class="bold">May 8<sup>th</sup> – 30<sup>th</sup></span>, 
            depending on what date is selected by the customer. Due to a high volume of orders, the limited 
            <span class="bold">Sakura Spring Collection</span> may become out-of-stock quickly. Mark your calendar right now!
          </p>
        </div>
        <div class="countdown">
          <h2>Countdown</h2>
          <ul class="count">
            <li class="count-board">
              <p class="numbers days">{{ days }}</p>
              <p class="strings timeRefDays">Days</p>
            </li>
            <li class="count-board">
              <p class="numbers days">{{ hours }}</p>
              <p class="strings timeRefDays">hours</p>
            </li>
            <li class="count-board">
              <p class="numbers days">{{ minutes }}</p>
              <p class="strings timeRefDays">minutes</p>
            </li>
            <li class="count-board">
              <p class="numbers days">{{ seconds }}</p>
              <p class="strings timeRefDays">seconds</p>
            </li>
          </ul>
        </div>
        <div class="disclaimer">
          <p>
            This collection will be highly limited. Each set includes one <span class="bold">Sakura Fraise Cheesecake</span>, 
            two <span class="bold">Sakura Yakigashi</span>, and one exclusive <span class="bold">Sakura Spring Cup</span>. Everything comes as a set for 
            <span class="bold">$35.95 + tax</span> and cannot be purchased separately, limited to one set per order.
          </p>
        </div>
        <div class="menu">
          <a-row :gutter="[0,50]">
            <a-col>
              <a-row :gutter="[20,20]">
                <!-- <a-col :md="10" :sm="24"> -->
                <a-col :span="10">
                  <div class="imgContainer">
                    <img src="/precountdown/flower1.png" alt="Cheese Garden">
                  </div>
                </a-col>
                <!-- <a-col :md="14" :sm="24"> -->
                <a-col :span="14">
                  <div class="txtContainer">
                    <div class="graphic">
                      <img src="/precountdown/point1.png" alt="Cheese Garden" style="width: 25px; transform: translateY(-4px);">
                    </div>
                    <div class="text">
                      <h3 class="en">Sakura Fraise Cheesecake</h3>
                      <h4 class="jp"> 桜咲く苺のチーズケーキ</h4>
                      <p class="description">
                        Combining the sweetness of premium strawberries with the 
                        tantalizing flavor of cherry blossoms, the middle is made up 
                        of delectable layers of delicate sakura jam, mixed with an 
                        unexpected salt-pickled sakura from Kanagawa, and finished 
                        with our signature famous no-bake cheesecake. Then, it’s 
                        lathered with a custardy creamy pudding while the bottom 
                        layer is made of spongey matcha cake. The finishing layer is 
                        inspired by Japanese Mizu Yokan. To complete, the dessert 
                        is sprinkled with gorgeous sakura-shaped decorations as 
                        well as gold flakes.
                      </p>
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col>
              <a-row :gutter="[20,20]">
                <!-- <a-col  :md="{span: 10, push: 14}" :sm="{span: 24, push: 0}"> -->
                <a-col :span="10" :push="14">
                  <div class="imgContainer">
                    <img src="/precountdown/flower2.png" alt="Cheese Garden">
                  </div>
                </a-col>
                <!-- <a-col :md="{span: 14, pull: 10}" :sm="{span: 24 }"> -->
                <a-col :span="14" :pull="10">
                  <div class="txtContainer">
                    <div class="graphic">
                      <img src="/precountdown/point2.png" alt="Cheese Garden" style="margin-right: 5px; height: 27px; transform: translateY(2px);">
                    </div>
                    <div class="text">
                      <h3 class="en">Sakura Yakigashi</h3>
                      <h4 class="jp"> 桜焼き菓子</h4>
                      <p class="description">
                        The Yakigashi is also made with sakura from Kanagawa. This 
                        snack is the perfect marriage between a cookie and a bar, 
                        making it a fruity, crunchy, decadent treat. An element of 
                        nuttiness is always welcomed. Hence why we mixed in 
                        toasted chopped pistachios and almonds for bite, as well as 
                        pillowy marshmallows for a balance of textures. To complete, 
                        a white chocolate coating is added with a piece of dried 
                        Kanagawa sakura. 
                      </p>
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>
            <a-col>
              <a-row :gutter="[20,20]">
                <!-- <a-col :md="10" :sm="24"> -->
                <a-col :span="10">
                  <div class="imgContainer">
                    <img src="/precountdown/flower3.png" alt="Cheese Garden">
                  </div>
                </a-col>
                <!-- <a-col :md="14" :sm="24"> -->
                <a-col :span="14">
                  <div class="txtContainer">
                    <div class="graphic">
                      <img src="/precountdown/point3.png" alt="Cheese Garden" style="margin-right: 2px; width: 25px; transform: translateY(3px);">
                    </div>
                    <div class="text">
                      <h3 class="en">Exclusive Sakura Spring Cup Set</h3>
                      <h4 class="jp"> 春の桜カップセット</h4>
                      <p class="description">
                        The gift set comes with a special cute little sakura-themed 
                        cup that is yours to enjoy all year long; complete with an 
                        elegant wooden lid, an adorable mixing spoon, and a coaster 
                        to make sure no furniture is stained while enjoying your 
                        favorite drink! Whether you appreciate a bright green matcha 
                        latte, or just a good old cup of green tea, it will always look 
                        adorable. 
                      </p>
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="maps">
        <div class="internalWrapper">
          <a-row :gutter="[40, 40]">
            <!-- <a-col :md="12" :sm="24"> -->
            <a-col :span="12">
              <div class="delivery">
                <div class="text">
                  <h3 class="header">
                    Delivery
                  </h3>
                  <p>
                    For orders of the 2021 Sakura Spring Collection, 
                    you can enjoy FREE contactless delivery. Please 
                    check the map below to see if you’re within the 
                    delivery zone.
                  </p>
                </div>
                <div class="imgContainer">
                  <img src="/precountdown/map1.png" alt="Cheese Garden">
                </div>
              </div>
            </a-col>
            <!-- <a-col :md="12" :sm="24"> -->
            <a-col :span="12">
              <div class="pickup">
                <div class="text">
                  <h3 class="header">
                    Pick-Up
                  </h3>
                  <p style="margin-bottom: 0">
                    The Sakura Spring Collection can be picked up at: 
                  </p>
                  <ul>
                    <li>Cheese Garden Eaton Centre store</li>
                    <li>Cheese Garden North York store</li>
                    <li>Cheese Garden Midland store</li>
                  </ul>
                </div>
                <div class="imgContainer">
                  <img src="/precountdown/map2.png" alt="Cheese Garden">
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </section>
    <FooterPink />
  </div>
</template>
<script>
export default {
  data() {
    return {
      time:undefined,
      seconds:'00',
      minutes:'00',
      hours:'00',
      days: '00'
    }
  },
  methods: {
    newTime() {
      let time = new Date(2021, 4, 1, 11, 0, 0, 0).valueOf() - new Date().valueOf();
      let seconds = Math.floor( (time/1000) % 60 );
      let minutes = Math.floor( (time/1000/60) % 60 );
      let hours = Math.floor( (time/(1000*60*60)) % 24 );
      let days = Math.floor( time/(1000*60*60*24) );

      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (days < 10) {
        days = "0" + days;
      }

      this.time = time
      this.seconds = seconds
      this.minutes = minutes
      this.hours = hours
      this.days = days
    }
  },
  created() {
    this.newTime()
    setInterval(this.newTime, 1000)
  }
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@1,700&family=New+Tegomin&family=Nunito:wght@300;600&display=swap');
// font-family: 'Alegreya Sans', sans-serif;
// font-family: 'New Tegomin', serif;
// font-family: 'Nunito', sans-serif;

#preCountdown {
  .en, .jp {
    color: $pink;
  }

  .header {
    color: $pink;
  }

  .countdown {
    h2 {
      font-size: 50px;
      font-family: 'Alegreya Sans', sans-serif;
      color: $pink;
      text-transform: uppercase;
      text-align: center;
      margin-top: 40px;
      margin-bottom: 0;
    }
  }

  .count {
    padding: 0;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom:40px;
    text-align: center;
    list-style: none;
  }

  .count-board {
    background-color: $green;
    padding: 0px 15px;
    color: #ffffff;
    border-radius: 10px;
    margin: 15px;
    width: 18%;

    .numbers {
      font-size: 65px;
      display: block;
      position: relative;
      text-align: center;
      font-weight: 700;
      color: white;
      font-family: 'Alegreya Sans', sans-serif;
      margin-bottom: 0;
    }

    .strings {
      font-size: 18px;
      font-weight: 700;
      display: block;
      position: relative;
      text-align: center;
      text-transform: uppercase;
      color: white;
    }
  }
}

// @media (max-width: 900px) {

//   #preCountdown {
  
//     .count-board {
//       padding: 0px 10px;
//       border-radius: 10px;
//       margin: 10px;
  
//       .numbers {
//         font-size: 45px;
//         margin: 0;
//       }

//       .strings {
//         font-size: 14px;
//       }
//     }
//   }
// }

// @media (max-width: 650px) {

//   #preCountdown {
    
//     .count {
//       margin: 20px auto;
//     }

//     .count-board {
//       padding: 10px 5px;
//       border-radius: 10px;
//       margin: 5px;
//       width: 20%;
  
//       .numbers {
//         font-size: 35px;
//         margin: 0;
//       }
//       .strings {
//         font-size: 12px;
//       }
//     }
//   }
// }
// @media (max-width: 500px) {

//   #preCountdown {
//     .count-board {
//       border-radius: 10px;
//       margin: 5px;
  
//       .numbers {
//         font-size: 30px;
//       }

//       .strings {
//         font-size: 10px;
//       }
//     }
//   }
// }

// @media (max-width: 400px) {
//   #preCountdown {
//     .count-board {
//       width: 25%;
//     }
//   }
// }

</style>