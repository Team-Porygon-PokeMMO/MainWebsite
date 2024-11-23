<script lang="ts">
export default {
    data() {
        return {
        };
    },
    methods: {
        sortUp() {
            console.dir("sortUp")
        },
        sortDown() {
            console.dir("sortDown")
        }
    },

};
</script>

<style>
.main {
    min-height: 100%;
}

.active {
    background-color: rgba(51, 3, 3, 0.95);
}

/* Responsive styles */
@media (max-width: 768px) {
    .menu {
        padding: 10px;
    }

    .menu-list a {
        padding: 8px;
    }
}
</style>

<template>
    <UContainer>
        <div class="m-4 main">
            <div class="p-2 text-center">
                <h2>Bag Ordering</h2>
                <h3>Create your own bag sorting with this utility.</h3>
                <div class="grid grid-cols-12 grid-rows-1 text-center">
                    <div class="col-span-1">
                        <UIcon name="i-heroicons-arrow-long-up" class="text-xl cursor-pointer" @click="sortUp" />
                    </div>
                    <div class="col-span-1">
                        <UIcon name="i-heroicons-arrow-long-down" class="text-xl cursor-pointer" @click="sortDown" />
                    </div>
                    <div class="col-span-3">
                        <UInput placeholder="Priority" />
                    </div>
                    <div class="col-span-7">
                        <USelect placeholder="Item Name" />
                    </div>
                </div>
            </div>
        </div>
    </UContainer>
</template>