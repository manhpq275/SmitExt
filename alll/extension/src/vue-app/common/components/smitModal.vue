<template>
    <teleport to="body">
        <div class="smit-modal" v-if="open">
            <div class="smit-modal-content">
                <slot></slot>
            </div>
            <div class="smit-modal-backdrop"></div>
        </div>
    </teleport>
</template>

<script>
export default {
    name: "smit-modal",
    props: ["open"],
}
</script>

<style lang="scss" scoped>
.smit-modal {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    position: fixed;
}

.smit-modal-content {
    top: 50%;
    left: 50%;
    z-index: 2;
    position: absolute;
    transform: translate(-50%, -50%);
}

.smit-modal-backdrop {
    z-index: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba($color: #000000, $alpha: 0.5);
}
</style>