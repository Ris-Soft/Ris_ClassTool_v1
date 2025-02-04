<template>
    <div class="home">
        <div class="header">
            <h1 class="title">扩展页面</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style scoped>
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}

.header {
    text-align: center;
}

.icon {
    width: 100px;
    height: 100px;
}

.title {
    font-size: 2em;
    margin-top: 20px;
}
</style>