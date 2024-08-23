<script lang="ts">
export class RockRow {
    Id: number = 0;
    Smashed: boolean = false;
    Pokemon: string = '';
    Item: string = '';
}
export default {
    data() {
        return {
            columns: [
                {
                    key: "Smashed",
                    label: "Smashed",
                },
                {
                    key: "Pokemon",
                    label: "Pokemon",
                },
                {
                    key: "Item",
                    label: "Item",
                }
            ],
            items: [
                {
                    Id: 0,
                    Smashed: true,
                },
                {
                    Id: 1,
                    Smashed: true,
                    Pokemon: "Geodude"
                },
                {
                    Id: 2,
                    Smashed: true,
                    Pokemon: "Geodude",
                    Item: "Everstone"
                }
            ] as RockRow[],
            selectedItems: [] as RockRow[],
            smashedPokemon: "",
            smashedItem: ""
        }
    },
    methods: {
        removeFromList() {
            // filter from items where id meets from selectedItems
            this.items = this.items.filter((item: RockRow) => {
                return !this.selectedItems.some((selectedItem: RockRow) => selectedItem.Id === item.Id);
            });
            this.selectedItems = [];
        },
        addSmash() {
            this.items.push({
                Id: this.items.length,
                Smashed: true,
                Pokemon: this.smashedPokemon,
                Item: this.smashedItem
            });
            this.smashedPokemon = "";
            this.smashedItem = "";
        }
    },
    computed: {
        calculatedData() {
            const encounters = this.items.filter((item: RockRow) => item.Pokemon).length;
            const items = this.items.filter((item: RockRow) => item.Item).length;
            return {
                encounters,
                items,
                encountersPercentage: `${((encounters / this.items.length) * 100).toFixed(2)}%`,
                itemsPercentage: `${((items / this.items.length) * 100).toFixed(2)}%`
            }
        }
    }
}
</script>

<style scoped>
.image {
    width: 75px;
    height: 75px;
    margin: 2rem
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<template>
    <UContainer>
        <div class="center">
            <img src="/images/rock.png" class="image" alt="Rock Smash" />
            <h1>Rock Smash Tracking Utility</h1>
            <img src="/images/rock.png" class="image" alt="Rock Smash" />
        </div>
        Leave values empty if no pokemon nor pokemon was encountered.
        <div class="grid grid-cols-2">
            <div class="m-2">
                <label for="">Pokemon</label>
                <UInput v-model="smashedPokemon" />
            </div>
            <div class="m-2">
                <label for="">Item</label>
                <UInput v-if="!smashedPokemon" disabled v-model="smashedItem" class="bg-red-500" />
                <UInput v-else v-model="smashedItem" />
            </div>
        </div>
        <div class="center">
            <UButton block color="green" class="hover:cursor-pointer" @click="addSmash">
                Add Smash
            </UButton>
        </div>
        <UDivider class="mt-6 mb-4" />
        <div class="grid grid-cols-1 text-center items-center">
            <h2>Registered Smashes</h2>
            <h2>Data</h2>
        </div>
        <div class="grid grid-cols-3 text-center">
            <p><b>Total smashes:</b> {{ items.length }}</p>
            <p><b>Total pokemon encountered:</b> {{ calculatedData.encounters }}</p>
            <p><b>Total items obtained:</b> {{ calculatedData.items }}</p>
            <p></p>
            <p><b>Percentage of pokemon encountered:</b> {{ calculatedData.encountersPercentage }}</p>
            <p><b>Total of items obtained from pokemon:</b> {{ calculatedData.itemsPercentage }}</p>
        </div>
        <UDivider class="mt-6 mb-4" />
        <div class="grid grid-cols-1 mb-6">
            <UButton block class="hover:cursor-pointer" @click="removeFromList">
                Remove selected from list
            </UButton>
        </div>
        <UTable :rows="items" :columns="columns" v-model="selectedItems" />
    </UContainer>
</template>