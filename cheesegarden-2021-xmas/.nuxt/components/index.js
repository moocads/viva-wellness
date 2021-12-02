import { wrapFunctional } from './utils'

export { default as FooterOrange } from '../../components/FooterOrange.vue'
export { default as FooterPink } from '../../components/FooterPink.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as Nav } from '../../components/Nav.vue'

export const LazyFooterOrange = import('../../components/FooterOrange.vue' /* webpackChunkName: "components/footer-orange" */).then(c => wrapFunctional(c.default || c))
export const LazyFooterPink = import('../../components/FooterPink.vue' /* webpackChunkName: "components/footer-pink" */).then(c => wrapFunctional(c.default || c))
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyNav = import('../../components/Nav.vue' /* webpackChunkName: "components/nav" */).then(c => wrapFunctional(c.default || c))
