<template>
  <div id="body">
    <!-- <div id="petals">
    </div> -->
    <PostCountdown v-if="order === true" />
    <PreCountdown v-else />
  </div>
</template>

<script>
// import { TweenLite, TweenMax, Linear, Sine } from 'gsap'
export default {
  head() {
    return {
      title: "Cheese Garden | 2021 Sakura Spring Collection",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Cheese Garden's 2021 Sakura Spring Collection Event",
        },
        {
          name: "keywords",
          content:
            "cheese garden, cheesecake, sakura, cherry blossom, pink, spring, toronto, dessert, limited time event, cake, cup, set",
        },
      ],
    };
  },
  data() {
    return {
      order: false,
    };
  },
  created() {
    this.updateTimer();
    setInterval(this.updateTimer, 1000);
  },
  mounted() {
    // this.petals()
    if (this.order === true || this.order === false) {
      document.getElementById("body").style.opacity = "1";
    }
  },
  methods: {
    updateTimer() {
      let time =
        new Date(2021, 4, 1, 11, 0, 0, 0).valueOf() - new Date().valueOf();
      // console.log(time)
      if (time < 0) {
        this.order = true;
      }
      // console.log(this.order)
    },
    petals() {
      const container = document.getElementById("petals");

      document.addEventListener("mousemove", function (e) {
        container.style.backgroundPositionX = -e.offsetX * 0.07 + "px";
        container.style.backgroundPositionY = -e.offsetY * 0.1 + "px";
      });
    },
    // petals() {
    //   /*
    //   a Pen by DIACO : twitter.com/Diaco_ml  ||  codepen.io/MAW
    //   powered by GSAP : https://www.greensock.com/
    //   */
    //   TweenLite.set("#petals",{perspective:600})
    //   TweenLite.set("img",{xPercent:"-50%",yPercent:"-50%"})

    //   var total = 30;
    //   var warp = document.getElementById("petals"),	w = window.innerWidth , h = window.innerHeight;

    //   for (let i=0; i<total; i++){
    //     var Div = document.createElement('div');
    //     TweenLite.set(Div,{attr:{class:'dot'},x:R(0,w),y:R(-200,-150),z:R(-200,200)});
    //     warp.appendChild(Div);
    //     animm(Div);
    //   }

    //   function animm(elm){
    //     TweenMax.to(elm,R(6,15),{y:h+100,ease:Linear.easeNone,repeat:-1,delay:-15});
    //     TweenMax.to(elm,R(4,8),{x:'+=100',rotationZ:R(0,180),repeat:-1,yoyo:true,ease:Sine.easeInOut});
    //     TweenMax.to(elm,R(2,8),{rotationX:R(0,360),rotationY:R(0,360),repeat:-1,yoyo:true,ease:Sine.easeInOut,delay:-5});
    //   };

    //   function R(min,max) {return min+Math.random()*(max-min)};

    //   // a Pen by DIACO : twitter.com/Diaco_ml  ||  codepen.io/MAW
    // }
  },
};
</script>

<style lang="scss" scoped>
#body {
  opacity: 0;

  // #petals {
  //   top: 0;
  //   left: 0;
  //   width: 100vw;
  //   height: 100vh;
  //   position: fixed;
  //   z-index: 99999;
  //   background-image: url('/bg/bg.png');
  //   background-size: contain;
  //   background-repeat: repeat;
  //   background-position: center;
  //   transition: all 0.5s ease;
  //   pointer-events: none;
  //   opacity: 0.5;

  // .dot{
  //   width:35px;
  //   height:35px;
  //   position:absolute;
  //   background-image: url('/bg/petal.png');
  //   background-size: contain;
  //   background-repeat: no-repeat;
  // }
  // }
}
</style>
