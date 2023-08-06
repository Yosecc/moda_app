<template lang="html">
    <StackLayout 
        width="100%" 
        height="50" 
        padding="5" 
        margin="0"
    >
        <FlexboxLayout 
            justifyContent="center"
            alignItems="center"  
            class="ActivityIndicatorContent" 
            horizontalAlignment="center"
        >
            <ActivityIndicator 
                busy="true" 
                margin="0" 
                color="#E9418A" 
                horizontalAlignment="center" 
                verticalAlignment="center"
            />
        </FlexboxLayout>
    </StackLayout>
    </template>
<script>
export default {
    props: {},
    components: {},
    
    data() {
        return {};
    },
};
</script>
    

    