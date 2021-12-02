import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  FooterOrange: () => import('../../components/FooterOrange.vue' /* webpackChunkName: "components/footer-orange" */).then(c => wrapFunctional(c.default || c)),
  FooterPink: () => import('../../components/FooterPink.vue' /* webpackChunkName: "components/footer-pink" */).then(c => wrapFunctional(c.default || c)),
  Logo: () => import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  Nav: () => import('../../components/Nav.vue' /* webpackChunkName: "components/nav" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
