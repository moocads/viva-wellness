<template>
  <div id="body">
      <section class="header-mooc">
      <img src="/2021-garagara-web-banner-1200x600px-02.jpg" class="img-fluid" alt="Cheese Garden 2021 Christmas">
      <img src="/second-banner.jpg" class="img-fluid banner-desk" alt="Cheese Garden">
      <img src="/second-banner-m.jpg" class="img-fluid banner-mobile" alt="Cheese Garden">
        <img src="/third-banner.jpg" class="img-fluid banner-desk" alt="Cheese Garden">
      <img src="/third-banner-m.jpg" class="img-fluid banner-mobile" alt="Cheese Garden">
      <div class="video">
        <p>This year, the Gara Gara Pon game is not only valid for instore purchase, you can also place an order online ($30 or more before tax), then play the game when you pick up your order. </p>
<iframe width="315" height="315" src="https://www.youtube.com/embed/ZLdVw2RdrKE?start=2" title="" frameborder="0" allow="accelerometer; encrypted-media; gyroscope;" allowfullscreen style="border-radius:10px;" poster=""></iframe>
<br>
<br>
<br>
  <a href="https://onlineorder.cheesegarden.ca/" target="_blank" ><img src="/order-button.png" style="width:250px;" class="img-fluid" alt=""></a>
</div>
  
    </section>
  </div>
</template>

<script>
// import { TweenLite, TweenMax, Linear, Sine } from 'gsap'
export default {
  head() {
    return {
      title: "Cheese Garden | 021 Christmas Event",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Cheese Garden's 2021 Christmas Event",
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
    };
  },
};
</script>

<style lang="scss" scoped>
.header-mooc{
  img{
    width: 100%;
  }
}

.banner-desk{
  display: block;
}
.banner-mobile{
  display: none;
}

.video{
  padding-top: 200px;
  padding-bottom: 100px;
  background-image: url('/video-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;

  p{
    width: 500px;
    font-size: 16px;
    position: relative;
    margin: auto;
    text-align: center;
    display: block;
    color: #C8142D;
    padding-bottom: 50px;
  }
}

@media screen and (max-width:768px) {
  .banner-desk{
  display: none;
}
.banner-mobile{
  display: block;
}

.video{
  background-size: 100%;
  padding-top: 100px;
  padding-bottom: 70px;
  p{
    width: 300px;
    font-size: 16px;
  }
}
}
</style>
