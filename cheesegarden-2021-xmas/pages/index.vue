<template>
  <div id="body">
      <section class="header-mooc">
      <img src="/2021-garagara-web-banner-1200x600px-02.jpg" class="img-fluid" alt="Cheese Garden 2021 Christmas">
      <img src="/second-banner.jpg" class="img-fluid banner-desk" alt="Cheese Garden">
      <img src="/second-banner-m.jpg" class="img-fluid banner-mobile" alt="Cheese Garden">
        <img src="/third-banner.jpg" class="img-fluid banner-desk" alt="Cheese Garden">
      <img src="/third-banner-m.jpg" class="img-fluid banner-mobile" alt="Cheese Garden">
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

@media screen and (max-width:768px) {
  .banner-desk{
  display: none;
}
.banner-mobile{
  display: block;
}
}
</style>
