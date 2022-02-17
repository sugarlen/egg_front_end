<template>
    <div class="main">
        <div class="scroll-back" ref="srollBack">
            <span>
                1<br />
            1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />1<br />
            </span>
            
        </div>
    </div>
</template>
<script>
import scroll from "../../utils/scroll.js"
export default {
    name:'shake',
    data(){
        return {
            
        }
    },
    created(){

    },
    mounted(){
        const scrollView = new scroll({
            box: this.$refs.srollBack,
            ctrlsVisible: true,
        })
        console.log(scrollView)
    },
    methods:{

    }
}
</script>
<style>
.main{
    width: 100%;
    height: 100%;
}
.scroll-back{
    height:500px;
    width: 60%;
    background-color: beige;
}
</style>