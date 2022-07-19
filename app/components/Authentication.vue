<template>
    <Frame>
      <Page>
        <Label :text="componentActive" marginTop="100" />
        <!-- <component v-bind:is="componentActive"></component> -->
      </Page>  
    </Frame>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import Login from './Pages/Auth/Login'
  import Register from './Pages/Auth/Register.vue'
  export default {
    components:{
      Login, Register
    },
    computed:{
        // ...mapState('router',['component']),
        ...mapGetters('router',['componentActive'])
    }

  };
</script>
