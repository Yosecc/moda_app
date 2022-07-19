<template lang="html">
  <Page>
    <HeaderFullLogo/>
    <GridLayout rows="*,auto" padding="16" >
      <ScrollView row="0">
        <StackLayout  >
          <Label 
            text="Elige tus categorías favoritas"
            fontWeight="bold"
            color="#4D4D4D"
            marginBottom="16"
          />

          <WrapLayout>

            <StackLayout
              v-for="(item, key) in categories"
              :key="`categories${key}`"
              width="50%"
              padding="8"
            >
              <Label 
                :text="item.name"
                class="btnCategory"
                :class="isActive(item.id)"
                @tap="selectCategory(item)"
              />
            </StackLayout>

            <!-- <StackLayout
              v-for="(item, key) in subcategoriesList"
              :key="`subcategorie${key}`"
              width="33%"
              padding="8"
            >
              <Label 
                :text="item.name"
                class="btnCategory"
                :class="isActive(item.id)"
                @tap="selectCategory(item)"
              />
            </StackLayout> -->
            
          </WrapLayout>

        </StackLayout>
      </ScrollView>
      <StackLayout row="1" >
        <ActivityIndicator 
          :busy="isLoading" 
        />

        <button 
          text="CONTINUAR"
          v-show="!isLoading"
          horizontalAlignment="center"
          class="btn-primary-default"
          @tap="saveCategories"
        />

      </StackLayout>
    </GridLayout>
    
  </Page>
   
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex'
  import HeaderFullLogo from '../../Components/ActionBar/HeaderFullLogo'

  export default {
    components:{
      HeaderFullLogo
    },
    data() {
      return {
        categoriesSelecteds: [],
        subcategoriesList:[],
      };
    },
    mounted(){
      this.getCategories()
    },
    computed:{
      ...mapState('categories',['categories']),
      ...mapState(['isLoading']),
    },
    methods:{
      ...mapActions('categories',['getCategories','StorePreferences']),
      ...mapMutations(['changeisLoading']),
      ...mapMutations('categories',['setOrderedCategories']),
      selectCategory(item){
        let index = this.categoriesSelecteds.findIndex((element) => element.id == item.id)
        if(index == -1){
          this.categoriesSelecteds.push({id:item.id})
          
          this.subcategoriesList.push.apply(this.subcategoriesList,item.subcategories)
          // console.log(this.subcategoriesList)
        }else{
          this.categoriesSelecteds.splice(index, 1)
        }
      },
      isActive(id){
        let index = this.categoriesSelecteds.findIndex((element) => element.id == id)
        if(index == -1){
          return ''
        }else{
          return 'active'
        }
      },
      saveCategories(){
        let categoriasActuales = this.categories
        let categoriasReorganizadas = []
        this.categoriesSelecteds.forEach((element)=>{
          let index = this.categories.findIndex((el) => el.id == element.id)

          categoriasReorganizadas.push(this.categories[index])
        })

        this.categories.forEach((element)=>{
          let index = categoriasReorganizadas.findIndex((el)=> el.id == element.id)
          if(index == -1){
            categoriasReorganizadas.push(element)
          }
        })
        this.setOrderedCategories(categoriasReorganizadas)
        this.StorePreferences(this.categoriesSelecteds)
        this.$navigator.navigate('/home',{
          transition: {
            name: 'slideLeft',
            duration: 300,
            curve: 'easeIn'
          },
          clearHistory: true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
    .btnCategory{
      padding-top:    8;
      padding-bottom: 8;
      padding-left:   16;
      padding-right:  16;
      font-weight:    bold;
      border-width:   1;
      border-color:  #CECECE;
      color:         #4D4D4D;
      width:          100%;
      border-radius:  30;
      &.active{
        background: #DA0080;
        color: white;
        border-color: #DA0080;
      }
    }
    // Custom styles

</style>
