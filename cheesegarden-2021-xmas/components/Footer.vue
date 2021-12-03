<template>
  <footer class="footer">
    <div class="footer-info wrapper">
        <a-row>
          <!-- <a-col :md="{span: 18, offset: 3}" :sm="{span: 24, offset: 0}"> -->
          <a-col :span="18" :offset="3">
            <h3>TERMS & CONDITIONS</h3>
            <p class="terms">
* Promotion is valid on in-store purchases & online orders for pick-up from Dec. 11th to 24th, 2021.<br>
* The purchase value of $30 must be before taxes.<br>
* Free dessert gift voucher is redeemable in-store from Jan. 10th to Feb. 6th, 2022.<br>
* Promotion valid at all Cheese Garden stores in GTA. * Cannot be combined with any other offers.<br>
* Cheese Garden reserves the right to change terms and conditions without notice.
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
        <a-row>
          <small>2021 ​© CHEESE GARDEN CANADA </small>
          <small style="opacity:0.4;">Developed by <a href="https://moocads.com/" target="_blank" >Mooc Advertising Inc. </a></small>
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
  background-image: url('/bg-footer-06.jpg');
  background-size: cover;
  position: relative;

  h3{
    text-align: center;
  color: #ffffff;
  font-weight: 800;
  }

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

small{
  text-align: center;
  display: block;
  color: #ffffff;
}

@media screen and (max-width:768px) {
  .footer {
  background-size:100%;
  }

    .social-media-icons {
  list-style: none;
  display: inline-flex;
  text-align: center;
  padding: 0;
  margin: auto;

  li {
    margin: 15px;
    padding: 15px;
      text-align: center;
    a {
      color: white;
      font-size: 16px;
      font-weight: 500;
      padding: 0;
        text-align: center;
      
  }
  }
    }
}

</style>
