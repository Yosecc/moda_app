<template lang="html">

    <Page actionBarHidden="true" background="transparent" id="filterCategorias" borderRadius="10">
      <GridLayout columns="*" rows="auto, *">
        <StackLayout row="0" padding="15" @tap="ontapCategorie" width="100%">
          <Image 
            src="~/assets/icons/plus.png"
            width="40"
            height="40"
            horizontalAlignment="right"
            rotate="45"
          />
        </StackLayout>
      <!-- <label text="Seleccione una categoría:" /> -->
        <FlexboxLayout row="1" flexDirection="column" alignItems="center" justifyContent="center" borderRadius="15" >
          <StackLayout height="400" padding="16" >
            <SlideCategories 
              :categories="copia" 
              :navigate="false"
              verticalAlignment="center"
              @ontapCategorie="ontapCategorie"
            />
          </StackLayout>
          <StackLayout v-if="isSubcategorias" minHeight="250" width="100%" >
            <GridLayout columns="*" rows="auto,*,auto">
              <label text="Subcategorias"  row="0" col="0" textAlign="left" fontWeight="900" marginLeft="16" />
              <label :text="subCategorieActive"  row="0" col="0" textAlign="left" fontWeight="900" marginLeft="16" />
              <ScrollView row="1" col="0" marginLeft="16">
                <FlexboxLayout flexWrap="wrap" class="subcategorias" >
                  <StackLayout v-for="(item, key) in subcategories" :key="`sub${key}`">
                    <label @tap="onTapSubcategorie(item.id)" :text="item.name" :class="subCategorieActive == item.id  ? 'active':''"  />
                  </StackLayout>
                </FlexboxLayout>
              </ScrollView>
              <StackLayout  row="2" col="0" padding="8">
                <button 
                  text="FILTRAR"
                  horizontalAlignment="center"
                  class="btn-primary-default btn-sm"
                  height="30"
                  width="30%"
                  @tap="$modal.close()"
                />
              </StackLayout>
            </GridLayout>

          </StackLayout>

        </FlexboxLayout >

        

    </GridLayout>

    </Page>
</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  import SlideCategories from '~/components/Components/SlideCategories.vue'

  export default {
    mixins: [],
    props: {
      isSubcategorias:{
        type: Boolean,
        default: true

      }
    },
    components: {
      SlideCategories
    },
    filters: {
      
    },
    data() {
      return {
        copia: []
      };
    },
    watch:{
   
    },
    computed:{
      ...mapGetters('categories',['categorieActiveGetters','subcategories']),
      ...mapState('categories',['categoriesBase','subCategorieActive']),
    },
    mounted(){
      this.copia = JSON.parse(JSON.stringify(this.categoriesBase))

      // this.copia.find((e)=>e.id == 1).colSpan = 2
      // this.copia.find((e)=>e.id == 1).row = 0
      this.copia.find((e)=>e.id == 1).marginBottom = 16
      this.copia.find((e)=>e.id == 1).left = 260

      // this.copia.find((e)=>e.id == 2).colSpan = 1
      // this.copia.find((e)=>e.id == 2).row = 1
      this.copia.find((e)=>e.id == 2).marginBottom = 16
      
      // this.copia.find((e)=>e.id == 3).colSpan = 1
      // this.copia.find((e)=>e.id == 3).row = 1
      this.copia.find((e)=>e.id == 3).marginBottom = 16
      // this.copia.find((e)=>e.id == 3).left = 80

      // this.copia.find((e)=>e.id == 4).colSpan = 1
      // this.copia.find((e)=>e.id == 4).row = 2
      this.copia.find((e)=>e.id == 4).marginBottom = 16
      // this.copia.find((e)=>e.id == 4).left = 80

      // this.copia.find((e)=>e.id == 5).colSpan = 1
      // this.copia.find((e)=>e.id == 5).row = 2
      this.copia.find((e)=>e.id == 5).marginBottom = 16
      // this.copia.find((e)=>e.id == 5).left = 80

    },
    methods:{
      // ...mapActions('stores',['getStoreRosa']),
      ...mapMutations('categories',['setCategorieActive','setSubcategoriesActive']),
      ontapCategorie(){
       
        this.setSubcategoriesActive('')
        this.$modal.close()
      },
      onTapSubcategorie(id){
        if(this.subCategorieActive == id){
          this.setSubcategoriesActive('')
        }else{
          this.setSubcategoriesActive(id)
        }
        
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
