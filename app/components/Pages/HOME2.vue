<Page>
    <HeaderDefault :back="false" />
    <ScrollView>
      <StackLayout >
        <StackLayout  marginTop="16" marginLeft="16" marginRight="16">
          <label 
            @tap="onNavigateSearch"
            text="Buscar productos" 
            class="inputForm false" 
            horizontalAlignment="left"
            width="100%"
            height="40"
            paddingTop="8"
            fontWeight="200"
            borderRadius="0" 
          />
        </StackLayout>
        <StackLayout  marginTop="24" marginBottom="16" marginLeft="8" marginRight="8">
           <SlideCategories  :categories="[]" />
        </StackLayout>

        <StackLayout marginBottom="16">
          <SliderComponent :sliders="sliders._array"/>
        </StackLayout>  
       
        <!-- <StackLayout marginBottom="24"  marginTop="8"> -->
          <!-- <Promotions/> -->
        <!-- </StackLayout> -->

       <!--  <StackLayout v-if="productsRecentlySeen[0]" padding="16">
          <recentlySeen :product="productsRecentlySeen[0]"/>
        </StackLayout> -->

        <StackLayout >
          <Label 
            text="Marcas Populares" 
            marginBottom="8" 
            marginLeft="16" 
            marginRight="16"
            fontWeight="900"
          />
          
          <Stores />
          
        </StackLayout>

        <StackLayout  marginTop="16" >
          <Label 
            v-if="ultimosProductos.length"
            text="Ingresos de Hoy" 
            marginBottom="16" 
            marginLeft="16" 
            marginRight="16"
            fontWeight="900"
          />

          <ListView for="item in ultimosProductos" >
            <v-template>
              
              <label :text="item.name" />
              <!-- <ProductBox
                :product="item"
              ></ProductBox> -->
            </v-template>
          </ListView>

          <!-- <WrapLayout v-if="ultimosProductos.length">
            <StackLayout
              v-for="(item,key) in ultimosProductos"
              :key="`product-home-${key}`"
              width="50%">
              
              <ProductBox
                :product="item"
              ></ProductBox>
            </StackLayout>
          </WrapLayout> -->

          <!-- <StackLayout v-if="!ultimosProductos.length" padding="0 16">
            <StackLayout horizontalAlignment="left" class="label_skeleton" width="40%" />
          </StackLayout> -->
          <!-- <WrapLayout  v-if="!ultimosProductos.length" >
            <StackLayout
              v-for="i in 6"
              :key="`ultimosSkeleton-${i}`"
               width="50%"
               padding="8"
              >
              <StackLayout class="label_skeleton" height="200">
                
              </StackLayout>
            </StackLayout>
          </WrapLayout> -->
        </StackLayout>
       
      </StackLayout>
    </ScrollView>
  </Page> 