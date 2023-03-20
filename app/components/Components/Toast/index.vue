<template lang="html">
    
    <StackLayout v-if="toast.status" class="toastAnimate" top="56" left="0" width="100%"  padding="8 16">
			<StackLayout orientation="horizontal" class="card toast" :class="toast.type" >
				<image 
					v-if="toast.type == 'success'" 
					src="~/assets/icons/check_white.png" 
					width="24" 
					marginRight="16" 
					rotate="0"
					stretch="aspectFit" 
				/>
				<image 
					v-if="toast.type == 'danger'" 
					src="~/assets/icons/plus_white.png" 
					width="32" 
					:rotate="toast.type == 'danger' ? 45:0" 
					marginRight="16" 
					stretch="aspectFit" 
				/>
				<StackLayout>
					<Label v-if="toast.title != ''" textWrap :text="toast.title" color="white" />
					<Label v-if="toast.message != ''" textWrap :text="toast.message" color="white" fontSize="12" />
				</StackLayout>
			</StackLayout>
		</StackLayout>

</template>
  
<script  >
	import { mapMutations, mapState, mapActions } from 'vuex'
	export default {
		props:{

		},
		components:{
			
		},
		data() {
			return {

			};
		},
		watch:{
			
		},
		computed:{
			...mapState(['toast'])

		},
		methods:{
			
		}
	}
</script>
  
  