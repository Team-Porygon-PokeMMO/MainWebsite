<script lang="ts">
export class RockRow {
    Id: number = 0;
    Smashed: boolean = false;
    Pokemon: string = '';
    Item: string = '';
}


const possibleSmashers = [
    {
        Name: "Kanto",
        Fossils: [
            "Helix Fossil",
            "Dome Fossil",
            "Old Amber"
        ],
        Pokemon: [
            {
                Name: "Graveler",
                Items: [
                    "Everstone",
                    "Hard Stone",
                ]
            },
            {
                Name: "Golem",
                Items: [
                    "Everstone",
                    "Hard Stone",
                ]
            },
            {
                Name: "Slugma"
            },
            {
                Name: "Magcargo"
            },
            {
                Name: "Geodude",
                Items: [
                    "Everstone",
                    "Hard Stone",
                ]
            }
        ]
    },
    {
        Name: "Johto",
        Fossils: [
            "Helix Fossil",
            "Dome Fossil",
            "Old Amber"
        ],
        Pokemon: [
            {
                Name: "Geodude",
                Items: [
                    "Everstone",
                    "Hard Stone"
                ]
            },
            {
                Name: "Graveler",
                Items: [
                    "Everstone",
                    "Hard Stone"
                ]
            },
            {
                Name: "Golem",
                Items: [
                    "Everstone",
                    "Hard Stone"
                ]
            },
            {
                Name: 'Shuckle',
                Items: [
                    'Berry Juice'
                ]
            },
            {
                Name: 'Krabby'
            },
            {
                Name: 'Kingler'
            },
            {
                Name: 'Slugma'
            }
        ]
    },
    {
        Name: "Hoenn",
        Fossils: [
            'Claw Fossil',
            'Root Fossil'
        ],
        Pokemon: [
            {
                Name: "Geodude",
                Items: [
                    "Everstone",
                    "Hard Stone",
                ]
            },
            {
                Name: "Graveler",
                Items: [
                    "Everstone",
                    "Hard Stone",
                ]
            },
            {
                Name: "Golem",
                Items: [
                    "Everstone",
                    "Hard Stone",
                ]
            },
            {
                Name: 'Shuckle',
                Items: [
                    'Berry Juice'
                ]
            },
            {
                Name: 'Nosepass',
                Items: [
                    'Hard Stone',
                    'Magnet',
                    'Float Stone'
                ]
            }
        ]
    },
    {
        Name: "Sinnoh",
        Fossils: [
            'Armor Fossil',
            'Skull Fossil'
        ],
        Pokemon: [

            {
                Name: "Geodude",
                Items: [
                    "Everstone",
                    "Hard Stone",
                ]
            },
            {
                Name: "Graveler",
                Items: [
                    "Everstone",
                    "Hard Stone",
                ]
            },
            {
                Name: "Golem",
                Items: [
                    "Everstone",
                    "Hard Stone",
                ]
            },
            {
                Name: 'Spiritomb',
                Items: [
                    'Smoke Ball'
                ]
            },
            {
                Name: 'Nosepass',
                Items: [
                    'Hard Stone',
                    'Magnet',
                    'Float Stone'
                ]
            },
            {
                Name: 'Probopass',
                Items: [
                    'Hard Stone',
                    'Magnet',
                    'Float Stone'
                ]
            },
            {
                Name: 'Magcargo'
            }
        ]
    },
    {
        Name: "Unova",
        Fossils: [
            'Cover Fossil',
            'Plume Fossil'
        ],
        Pokemon: [
            {
                Name: "Graveler",
                Items: [
                    "Everstone",
                    "Hard Stone",
                ]
            },
            {
                Name: "Golem",
                Items: [
                    "Everstone",
                    "Hard Stone",
                ]
            },
            {
                Name: "Roggenrola",
                Items: [
                    "Everstone",
                    "Hard Stone",
                ]
            },
            {
                Name: "Boldore",
                Items: [
                    "Everstone",
                    "Hard Stone",
                ]
            },
            {
                Name: "Gigalith",
                Items: [
                    "Everstone",
                    "Hard Stone",
                ]
            },
            {
                Name: 'Goleet',
                Items: [
                    'Light Clay'
                ]
            },
            {
                Name: 'Dwebble',
                Items: [
                    'Hard Stone',
                    'Rare Bone'
                ]
            },
            {
                Name: 'Crustle',
                Items: [
                    'Hard Stone',
                    'Rare Bone'
                ]
            }
        ]
    }
]

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
            ] as RockRow[],
            selectedItems: [] as RockRow[],
            options: possibleSmashers,
            smashedPokemon: "",
            smashedItem: "",
            selectedRegionIndex: 0,
            emptyOption: {
                Name: ""
            }
        }
    },
    mounted() {
        this.retrieveLocalStorage();
    },
    methods: {
        removeFromList() {
            // filter from items where id meets from selectedItems
            this.items = this.items.filter((item: RockRow) => {
                return !this.selectedItems.some((selectedItem: RockRow) => selectedItem.Id === item.Id);
            });
            this.selectedItems = [];
        },
        cleanList() {
            this.items = [];
        },
        addSmash() {
            this.items.push({
                Id: this.items.length,
                Smashed: true,
                Pokemon: this.smashedPokemon,
                Item: this.smashedItem
            });
            this.saveToLocalStorage();
        },
        setActiveRegion(index: number) {
            this.selectedRegionIndex = index;
            this.clearValues()
        },
        orderedNames(names: any) {
            return names.sort((a: any, b: any) => {
                if (a.Name < b.Name) {
                    return -1;
                }
                if (a.Name > b.Name) {
                    return 1;
                }
                return 0;
            });
        },
        clearItem() {
            this.smashedItem = "";
        },
        clearName() {
            this.smashedPokemon = "";
        },
        clearValues() {
            this.clearItem()
            this.clearName()
        },
        retrieveLocalStorage() {
            if (process.client) {
                const items = localStorage.getItem('rockSmashItems');
                if (items) {
                    this.items = JSON.parse(items);
                }
            }
        },
        saveToLocalStorage() {
            if (process.client) {
                localStorage.setItem('rockSmashItems', JSON.stringify(this.items));
            }
        },
    },
    computed: {
        calculatedData() {
            const encounters = this.items.filter((item: RockRow) => item.Pokemon).length;
            const items = this.items.filter((item: RockRow) => item.Item).length;
            return {
                encounters,
                items
            }
        },
        orderedPokemon() {
            return (pokemon: any) => {
                return pokemon.sort((a: any, b: any) => {
                    if (a.Name < b.Name) {
                        return -1;
                    }
                    if (a.Name > b.Name) {
                        return 1;
                    }
                    return 0;
                });
            }
        },
        orderedItems() {
            return (index: number, pokemon: any) => {
                let items = this.options[index].Pokemon.find((poke: any) => poke.Name === pokemon)?.Items ?? [];
                let fossils = this.options[index].Fossils ?? [];
                let allItems = [...items, ...fossils];
                return allItems.sort((a: any, b: any) => {
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                    return 0;
                });
            }
        },
        getPokemonItems() {
            const uniquePokemon = [...new Set(this.items.map((item: RockRow) => item.Pokemon as string))].filter((item: string) => item);
            const pokemonItemRatio = uniquePokemon.map((pokemon: string) => {
                const pokemonItems = this.items.filter((item: RockRow) => item.Pokemon === pokemon);
                const uniqueItems = [...new Set(pokemonItems.map((item: RockRow) => item.Item))].filter((item: string) => item);
                return {
                    pokemon,
                    totalEncounters: pokemonItems.length,
                    totalItems: pokemonItems.filter((pokemonItem: RockRow) => pokemonItem.Item).length,
                    items: uniqueItems.map((item: string) => {
                        return {
                            item,
                            count: pokemonItems.filter((pokemonItem: RockRow) => pokemonItem.Item && pokemonItem.Item === item).length,
                        }
                    })
                }
            });
            return pokemonItemRatio
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

div.regions {
    padding: 2rem 1rem;
    margin: 0.1rem;
    cursor: pointer;
    border: 1px solid black;
}
</style>

<template>
    <UContainer>
        <div class="center">
            <img src="/images/rock.png" class="image" alt="Rock Smash" />
            <h1>Rock Smash Tracking Utility</h1>
            <img src="/images/rock.png" class="image" alt="Rock Smash" />
        </div>
        <div class="grid grid-cols-5">
            <div class="items text-label text-center items-center m-2 p-4 hover:cursor-pointer border-black border hover:bg-blue-500"
                v-for="(option, index) in options" @click="setActiveRegion(index)"
                :class="{ active: index === selectedRegionIndex }">
                <span class="bg-black bg-opacity-50 text-white p-0.5">{{ option.Name }}</span>
            </div>
        </div>
        <h2 class="center">{{ options[selectedRegionIndex].Name }}</h2>
        Leave values empty if no pokemon nor item was encountered.
        <div class="grid grid-cols-2">
            <div class="m-2">
                <label for="">Pokemon</label>
                <USelect :options="[emptyOption, ...orderedPokemon(options[selectedRegionIndex].Pokemon)]"
                    optionAttribute="Name" v-model="smashedPokemon" @change="clearItem" />
            </div>
            <div class="m-2">
                <p>Item</p>
                <USelect v-if="!smashedPokemon || orderedItems(selectedRegionIndex, smashedPokemon).length === 0"
                    disabled />
                <USelect v-else :options="[emptyOption, ...orderedItems(selectedRegionIndex, smashedPokemon)]"
                    optionAttribute="Name" v-model="smashedItem" />
            </div>
        </div>
        <div class="center">
            <UButton block color="green" class="hover:cursor-pointer m-1" @click="addSmash">
                Add Smash
            </UButton>
        </div>
        <div class="center">
            <UButton block color="red" class="hover:cursor-pointer m-1" @click="clearValues">
                Clear Values
            </UButton>
        </div>
        <div v-if="items.length > 0">
            <UDivider class="mt-6 mb-4" />
            <div class="grid grid-cols-1 text-center items-center">
                <h2>Registered Smashes</h2>
                <h2>Data</h2>
            </div>
            <div class="grid grid-cols-3 text-center">
                <p><b>Total smashes:</b> {{ items.length }}</p>
                <p><b>Total pokemon encountered:</b> {{ calculatedData.encounters }}</p>
                <p><b>Total items obtained:</b> {{ calculatedData.items }}</p>
            </div>
            <div class="grid grid-cols-1 text-center items-center">
                <h2>Data by Pokemon</h2>
            </div>
            <div class="grid grid-cols-4 text-center">
                <p v-for="pokemon in getPokemonItems">
                    <b>
                        {{ pokemon.pokemon }}
                    </b>
                    ({{ pokemon.totalEncounters }})
                <p>
                    <b>
                        Items
                    </b>
                    ({{ pokemon.totalItems }})
                </p>
                <p v-for="item in pokemon.items">
                    <b>
                        {{ item.item }}
                    </b>
                    ({{ item.count }})
                </p>
                </p>
            </div>
            <UDivider class="mt-6 mb-4" />
            <div class="grid grid-cols-1 mb-6">
                <UButton block class="hover:cursor-pointer m-2" @click="cleanList">
                    Clean table
                </UButton>
                <UButton block class="hover:cursor-pointer m-2" @click="removeFromList">
                    Remove selected from list
                </UButton>
            </div>
            <UTable :rows="items" :columns="columns" v-model="selectedItems" />
        </div>
    </UContainer>
</template>