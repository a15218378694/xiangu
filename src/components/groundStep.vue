<template>
    <div>
        <div class="groundStep bgcWhite">
            <div class="one">
                <slot name="step1"></slot>
                <p class="des">邀请好友开团</p>
                <p class="tip"> （邀请3人即可开团）</p>
                <img class="go" src="../assets/img/拼团详情-未参团_slices/Arrow@3x.png" alt="">
            </div>

            <div class="two">
                <slot name="step2"></slot>
                <p class="des">邀请好友参团</p>
                <p class="tip">（肥水不流外人田）</p>
                <img class="go" src="../assets/img/拼团详情-未参团_slices/Arrow@3x.png" alt="">
            </div>
            <div class="three">
                <slot name="step3"></slot>
                <p class="des">数量购完 拼成</p>
                <p class="tip">(不限人数)</p>
            </div>
        </div>
    </div>
</template>