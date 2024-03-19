 <template lang="html">
  <GridLayout rows="*">
        
        <InputsLayout
          row="0"
          :clases="'shadow-none'"
          :inputs="infoPersonal"
        >

          <template slot="bottom">
            <!-- <Label :text="JSON.stringify(cliente)"/> -->
            <Button 
                class="btn btn-sm btn-info" 
                text="Guardar"
                marginTop="16"
                @tap="onUpdateProfile"
              />
          </template> 
        </InputsLayout> 

        


  </GridLayout>      
</template>

<script>
  import profileMixin from '~/mixins/profileMixin.js'
  import InputsLayout from '~/components/Components/InputsLayout.vue'

import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  export default {
    mixins: [profileMixin],
    props: {

    },
    components: {
      InputsLayout
    },
    filters: {

    },
    data() {
      return {
      };
    },
    watch:{

    },
    computed:{
      ...mapState('profile',['infoPersonal']),
      ...mapGetters('profile', ['cliente'] ),
    },
    mounted(){
      this.getClient()
    },
    methods:{
      ...mapActions('profile',['getClient','updateClient']),
      ...mapMutations(['changeToast']),

      onTapSave(){

      },
      onItemTap({item}){
        // this.setCoupon(item.id)
        this.coupons.forEach((e)=>{
          if(e.id == item.id){
            e.active = true
          }else{
            e.active = false
          }
        })
        // console.log(this.coupons)
      },
      validaInfoPersonal(){
        let errors = []
        this.infoPersonal.forEach( input => {
          if(input.required){
            if(input.model === '' || input.model === undefined || input.model === null){
              const text = 'Ingrese su '+input.label
              errors.push(text);
              this.changeToast({
                    title: text,
                    status: true,
                    type: 'danger',
                    message: ''
                })
            }
          }
        })
        
        return errors
      },
      onUpdateProfile(){
        const errors = this.validaInfoPersonal()

        if(errors.length){
          return
        }
        
        this.updateClient({
          firstName: this.cliente.first_name,
          lastName: this.cliente.last_name,
          dni: this.cliente.cuit_dni,
          gender: this.cliente.sex,
          areaCode: this.cliente.mobile_area,
          mobilePhone: this.cliente.mobile,
        }).then((response)=>{
          this.changeToast({
                    title: 'Actualizado',
                    status: true,
                    type: 'success',
                    message: ''
                })
        }).catch((error)=>{
          console.log('eror', error)
        })
        
      }
    }
    
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
