<template>
  <footer class="footer">
    <div class="footer-info wrapper">
        <a-row>
          <!-- <a-col :md="{span: 18, offset: 3}" :sm="{span: 24, offset: 0}"> -->
          <a-col :span="18" :offset="3">
            <p class="terms">
              Due to a high volume of orders, the limited Sakura Spring Collection may become out-of-stock quickly. Please understand that 
              we are doing our best to bake as many as possible to meet the high demand. On behalf of our team, we want to thank you for 
              your love and understanding. Small local businesses like us rely on your support, especially during a special time like this. We will 
              continue to bake your favourite products on a daily basis.
            </p>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="social-media">
            <ul class="social-media-icons">
              <li>
                <a href="https://www.instagram.com/cheesegarden_ca/">
                  <img src="/icons/ig.svg" alt="">
                  cheesegarden_ca
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/cheesegardenca">
                  <img src="/icons/fb.svg" alt="">
                  cheesegardenca
                </a>
              </li>
            </ul>
          </a-col>
        </a-row>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

.footer {
  padding-top: 50px;
  padding-bottom: 20px;
  background-color: $pink;
  position: relative;

  .terms {
    color: white;
    margin-bottom: 0;
    padding-bottom: 0;
    text-align: center;
    font-size: 12px;
  }
}

.social-media {
  text-align: center;
}
.social-media-icons {
  list-style: none;
  display: inline-flex;
  padding: 0;
  margin: auto;

  li {
    margin: 15px;
    padding: 15px;
    a {
      color: white;
      font-size: 20px;
      font-weight: 500;
      padding: 20px 35px;
      
      img {
        margin-right: 10px;
        width: 50px;
        max-height: 50px;
        filter: invert(1);
      }
    }
  }
}

// @media screen and (max-width: 990px) {
//   .social-media-icons {
//     padding: 0;

//     li {
//       margin: 0px;
//       padding: 15px;
//       a {
//         color: white;
//         font-size: 16px;
//         font-weight: 500;
//         padding: 20px 0px;
//         img {
//           margin-right: 5px;
//           width: 35px;
//           max-height: 35px;
//         }
//       }
//     }
//   }
// }

// @media screen and (max-width: 768px) {
//   .footer {
//     // background-image: url('/img/footer-bg-mobile-01.svg');
//     // padding-top:35%;
//     // background-size: 80%;

//     h2 {
//       font-size: 16px;
//     }
//   }

//   .social-media-icons {
//     li {
//       margin: 15px;
//       padding: 15px 0px;
//       a {
//         color: white;
//         font-size: 16px;
//         font-weight: 500;
//         padding: 20px 0px;
//         img {
//           margin-right: 5px;
//           width: 26px;
//           max-height: 26px;
//         }
//       }
//     }
//   }
// }

// @media screen and(max-width: 575px) {
//   .bg-footer {
//     margin-top: -70px;
//   }
// }
// .footer-credit{
//     margin-bottom: 40px;
// }
.terms-and-condition{
    text-align: left;
}
</style>
