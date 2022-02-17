<template>
    <div class="background">
        <div class="pig">
            <div class="ears-border"></div>
            <div class="ears"></div>
            <div class="eyes"></div>
            <div class="nose"></div>
        </div>
    </div>
</template>
<script>
export default {
    name:'have',
    data(){
        return {
            
        }
    }
}
</script>
<style>
.background{
    height: 100%;
    height: 800px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: skyblue;
}
.pig{
    position: relative;
    width: 220px;
    height: 170px;
    font-size: 12px;
    border: 4px solid #2b4d13;
    background-color: #50a032;
    border-radius: 50% 50% 50% 50% / 55% 60% 40% 45%;
    box-shadow: 
        inset -1.5em 1em 1.5em -0.5em rgba(255, 255, 255, 0.3),
        inset 0.5em -0.5em 0.8em 0.2em rgba(0, 0, 0, 0.2);
}
.eyes::before,
.eyes::after{
    content: '';
    display: block;
    position: absolute;
    width: 50px;
    height: 50px;
    border: 2px solid #2b4d13;
    box-shadow: -3px 10px 3px #4a912c,
                inset 7px -8px 10px rgb(0 0 0 / 30%);
    border-radius: 50%;
    background: -webkit-radial-gradient(circle closest-side, black 26%,#fff 36%);
}
.eyes::before{
    left: 15px;
    top: 60px;
    background: -webkit-radial-gradient(closest-side at 20% 80%, black 26%,#fff 36%);
}
.eyes::after{
    right: 7px;
    top: 61px;
    background: -webkit-radial-gradient(circle closest-side, black 26%,#fff 36%);
}
.nose{
    position: absolute;
    width: 82px;
    height: 72px;
    background-color: #83B922;
    border: 2px solid #3b631e;
    box-shadow: -3px 10px 3px #4a912c;
    border-radius: 50% 50% 50% 50% / 51% 53% 40% 45%;
    top: 49px;
    left: 78px;
}
.nose::before,
.nose::after{
    content: '';
    display: block;
    width: 20px;
    height: 32px;
    background-color: #112C03;
    border-radius: 50% 50% 50% 50% / 51% 53% 40% 45%;
    box-shadow: inset -4px -2px 2px #266A1E;
    position: absolute;
}
.nose::before{
    top: 22px;
    left: 12px;
}
.nose::after{
    top: 23px;
    right: 17px;
    height: 28px;
}
.ears::before,
.ears::after{
    width: 7px;
    height: 6px;
    position: absolute;
    border: 2px solid #2b4d13;
    background-color: #2D6217;
    border-radius: 50% 50% 50% 50% / 50% 50% 45% 42%;
    box-shadow: 0px -2px 0px 12px #50a032,
    /* 0.3em 0.6em 0 -0.2em,
        -0.1em 0.6em 0 -0.1em,
        -0.6em 0.6em 0 -0.2em,
        -0.1em -0.2em 0 0.4em, */
        -0.1em -0.2em 0 0.6em #2b4d13;
}
.ears::before{
    content: '';
    display: block;
    top: 10px;
    left: 34px;
    transform: rotate(-40deg);
}
.ears::after{
    content: '';
    display: block;
    top: -11px;
    right: 86px;
}
.pig::before,
.pig::after{
    content:'';
    display: block;
    position: absolute;
    width: 30px;
    height: 10px;
    background-color: #0D2E01;
    border-radius: 50% 50% 0 0 / 100% 100% 0 0 ;
}
.pig::before{
    top: 40px;
    left: 24px;
    transform: rotate(-15deg);
}
.pig::after{
    top: 36px;
    right: 23px;
    transform: rotate(20deg);
}
.ears-border::before,
.ears-border::after{
    content: '';
    display: block;
    position: absolute;
    width: 35px;
    height: 35px;
    background-color: #50a032;
    border: 4px solid #2b4d13;
    border-radius: 50% 50% 50% 50% / 50% 50% 45% 42%;
    border-bottom: none;
}
.ears-border::before{
    top: -10px;
    left: 14px;
    transform: rotate(-30deg);
}
.ears-border::after{
    top: -33px;
    right: 70px;
    transform: rotate(5deg);
}
</style>