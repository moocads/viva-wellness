<template>
  <div id="consolidatedHeader">
    <header :class="{ navActive: isActive }">
      <div class="navToggle" @click="toggleNav">
        <div class="hamburger">
          <div class="hamburgerOne line"></div>
          <div class="hamburgerTwo line"></div>
          <div class="hamburgerThree line"></div>
        </div>
      </div>
      <nav>
        <div class="wrapper navbarWrap">
          <div class="left">
            <a href="https://www.cheesegarden.ca/" class="logo">
              <img src="/logo/logo.png" alt="Cheese Garden" style="margin-bottom: 5px">
            </a>
          </div>
          <div class="right">
            <ul id="webNav" class="navbar">
              <li>
                <a href="https://www.cheesegarden.ca/">
                  Our Cakes
                </a>
              </li>
              <li>
                <a href="https://www.cheesegarden.ca/ourstory">
                  Our Story
                </a>
              </li>
              <li>
                <a href="https://www.cheesegarden.ca/">
                  Visit Us
                </a>
              </li>
              <li>
                <a href="https://onlineorder.cheesegarden.ca/">
                  Online Order
                </a>
              </li>
              <li class="active">
                <a href="https://sakuraspring.cheesegarden.ca/">
                  2021 Christmas Event
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav id="mobileNav">
        <div class="logo">
          <img src="/logo/logo.png" alt="Cheese Garden">
        </div>
        <ul class="navbar">
          <li>
            <a href="https://www.cheesegarden.ca/">
              Our Cakes
            </a>
          </li>
          <li>
            <a href="https://www.cheesegarden.ca/ourstory">
              Our Story
            </a>
          </li>
          <li>
            <a href="https://www.cheesegarden.ca/">
              Visit Us
            </a>
          </li>
          <li>
            <a href="https://onlineorder.cheesegarden.ca/">
              Online Order
            </a>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 10) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
    toggleNav() {
      document
        .querySelectorAll('#mobileNav, div.hamburger .line')
        .forEach((el) => {
          el.classList.toggle('active')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Spinnaker&display=swap');

#consolidatedHeader {
  height: auto;
  // overflow-x: hidden;
  transition: all 0.5s ease;

  .logo {
    img {
      max-height: 100px;
      object-fit: contain;
    }
  }

  header {
    position: relative;
    width: 100%;
    z-index: 999;
    transition: all 0.5s ease;
    box-shadow: 0px 2px 5px -2px rgba(80, 80, 80, 0.5);
  }
}

header nav {
  display: flex;
  padding: 12.5px 0px;
  background-color: white;

  .navbarWrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 115px;
    margin-right: 30px;

    img {
      width: 100%;
      transition: all 0.5s ease;
    }
  }

  .navbar {
    display: flex;
    list-style: none;
    padding-left: 0;
    transform: translateY(10px);

    li {
      font-size: 14px;
      font-family: 'Spinnaker', sans-serif;
      display: flex;
      align-items: center;
      text-transform: uppercase;
      color: black;

      &:hover, &:focus {
        color: $yellow;
      }

      &.active {
        color: #C8142D;
        font-weight: bold;
      }
    }
  }
}

header #webNav {
  li {
    margin-right: 70px;

    &:last-child{
      margin-right: 0;
    }
  }
}

header #mobileNav {
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: -150%;
  top: 0;
  height: 100vh;
  width: 300px;
  transition: all 0.5s ease;
  display: none;
  box-shadow: -10px 10px 30px -20px rgb(87, 48, 64);

  &.active {
    right: 0;
  }

  .navbar {
    flex-direction: column;

    li {
      margin-bottom: 20px;
      font-size: 18px;
      text-align: center;
      font-family: 'Spinnaker', sans-serif;

      &:last-of-type {
        margin-bottom: 100px;
      }

      &.active {
        color: $yellow;
      }

      a::after {
        display: none;
      }
    }
  }
}

div.hamburger {
  position: fixed;
  right: 0px;
  top: 0px;
  z-index: 200;
  display: none;
  padding: 2rem;

  .line {
    background-color: $yellow;
  }

  &:hover, &:focus {
    cursor: pointer;
  }

  div {
    position: relative;
    width: 35px;
    height: 4px;
    border-radius: 5px;
    transition: all 0.3s;

    &.hamburgerOne {
      top: 0px;

      &.active {
        transform: rotate(45deg);
        transform-origin: top left;
      }
    }

    &.hamburgerTwo {
      top: 8px;

      &.active {
        opacity: 0;
      }
    }

    &.hamburgerThree {
      top: 16px;

      &.active {
        transform: rotate(-45deg);
        transform-origin: bottom left;
      }
    }
  }
}

@media screen and (max-width: 768px) {
   header nav
   {.navbar {


    li {
      font-size: 6px;
      margin-right: 10px;
      }
    }
   }

   header nav .logo{
    width: 80px;
     margin-right: 0px;
}
   header #webNav li {
    margin-right: 10px;
}

   #consolidatedHeader .logo img {
    width: 50px;
    }
}


</style>