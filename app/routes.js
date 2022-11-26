// routes.js
import Login from './components/Pages/Auth/Login'
import Register from './components/Pages/Auth/Register.vue'
import RecoverPassword from './components/Pages/Auth/RecoverPassword.vue'
import SetCategories from './components/Pages/Auth/SetCategories.vue'
import TermsAndConditions from './components/Pages/webViews/TermsAndConditions.vue'
import CodeValidation from './components/Pages/Auth/CodeValidation.vue'
import Home from './components/Pages/Home.vue'

import ShoppingCenter from './components/Pages/ShoppingCenter.vue'
import Search from './components/Pages/Search.vue'

import Product from './components/Pages/Product/index.vue'
import Store from './components/Pages/Store.vue'

import AllStores from './components/Pages/Store/AllStores.vue'

import HowToBuy from './components/Pages/SubPages/HowToBuy.vue' 
import Shipping from './components/Pages/SubPages/Shipping.vue' 


import webView from './components/Pages/WebViews/offerts.vue'

import Coupons from './components/Pages/Checkout/Coupons.vue'
import Datos from './components/Pages/Checkout/Datos.vue'
import Envios from './components/Pages/Checkout/Envios.vue'
import EnviosDetail from './components/Pages/Checkout/EnviosDetail.vue'
import MetodoPago from './components/Pages/Checkout/MetodoPago.vue'
import MetodoPagoDetail from './components/Pages/Checkout/MetodoPagoDetail.vue'
import Resumen from './components/Pages/Checkout/Resumen.vue'
import Success from './components/Pages/Checkout/Success.vue'
import Facturacion from './components/Pages/Checkout/Facturacion.vue'


import Profile from './components/Pages/Profile/index.vue'
import DireccionesForm from './components/Pages/Profile/DireccionesForm.vue'
import Pedido from './components/Pages/Profile/Pedido.vue'


import detailCar from './components/Pages/Car/detailCar.vue'


import filterCategorias from './components/Components/Modales/filterCategorias.vue'
import tiendasModal from './components/Components/Modales/tiendas.vue'
import methodsPaymentsModal from './components/Components/Modales/methodsPayments.vue'
import detalleCheckout from '~/components/Components/Modales/detalleCheckout.vue'
import confirmCart from '~/components/Components/Modales/confirmCart.vue'

export const routes = {
  '/confirm_cart':{
    component: confirmCart
  },
  '/facturacion':{
    component: Facturacion
  },
  '/detalle_checkout':{
    component: detalleCheckout
  },
  '/methods_payments':{
    component: methodsPaymentsModal
  },
  '/detail_car':{
    component: detailCar
  },
  '/shipping':{
    component: Shipping
  },
  '/tiendas_modal':{
    component: tiendasModal
  },
  '/register': {
    component: Register,
  },
  '/login': {
    component: Login,
  },
  '/recover_password':{
    component: RecoverPassword
  },
  '/set_categories':{
    component: SetCategories
  },
  '/terms_and_conditions':{
    component: TermsAndConditions
  },
  '/code_validation':{
    component: CodeValidation
  },
  '/home':{
    component: Home
  },
  '/shopping_center':{
    component: ShoppingCenter
  },
  '/search':{
    component: Search
  },
  '/how_to_buy':{
    component: HowToBuy
  },
  '/product':{
    component: Product
  },
  '/store':{
    component: Store
  },
  '/web_view':{
    component: webView
  },
  '/all_stores':{
    component: AllStores
  },
  '/coupons':{
    component: Coupons
  },
  '/envios':{
    component: Envios
  },
  '/envios_detail':{
    component: EnviosDetail
  },
  '/metodo_pago':{
    component: MetodoPago
  },
  '/metodo_pago_detail':{
    component: MetodoPagoDetail
  },
  '/resumen':{
    component: Resumen
  },
  '/success':{
    component: Success
  },
  '/datos':{
    component: Datos  
  },
  '/profile' : {
    component: Profile
  },
  '/direcciones_form':{
    component: DireccionesForm
  },
  '/pedido':{
    component: Pedido
  },
  '/filter_categorias':{
    component: filterCategorias
  }
  
}