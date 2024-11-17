<script lang="ts">
import nameToDex from '~/src/nameToDex.json'
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
                Name: 'Golett',
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
            selectedRegionIndex: 0,
            emptyOption: {
                Name: ""
            },
            nameToDex: nameToDex as IDictionarym,
            ign: '' as string
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
            this.saveToLocalStorage();
        },
        cleanList() {
            this.items = [];
            this.saveToLocalStorage();
        },
        addSmash(pokemonName: string, itemName: string) {
            this.items.push({
                Id: this.items.length,
                Smashed: true,
                Pokemon: pokemonName === 'Empty' ? '' : pokemonName,
                Item: itemName === 'Empty' ? '' : itemName
            });
            this.saveToLocalStorage();
        },
        setActiveRegion(index: number) {
            this.selectedRegionIndex = index;
            this.saveToLocalStorage();
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
        retrieveLocalStorage() {
            if (process.client) {
                const items = localStorage.getItem('rockSmashItems');
                const selectedRegionIndex = localStorage.getItem('rockSmashSelectedRegion');
                const ign = localStorage.getItem('ign');
                if (items) {
                    this.items = JSON.parse(items);
                }
                if (selectedRegionIndex) {
                    this.selectedRegionIndex = JSON.parse(selectedRegionIndex);
                }
                if (ign) {
                    this.ign = JSON.parse(ign);
                }
            }
        },
        saveToLocalStorage() {
            if (process.client) {
                localStorage.setItem('rockSmashItems', JSON.stringify(this.items));
                localStorage.setItem('rockSmashSelectedRegion', JSON.stringify(this.selectedRegionIndex));
                localStorage.setItem('ign', JSON.stringify(this.ign));
            }
        },
        getImageStyling(name: string) {
            let imgNumber: string = this.nameToDex[name]
            return {
                backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.2), rgba(0, 0, 0, .6)), url(/images/leads/${imgNumber}.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }
        }
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
                let sortedPokemon = pokemon.sort((a: any, b: any) => {
                    if (a.Name < b.Name) {
                        return -1;
                    }
                    if (a.Name > b.Name) {
                        return 1;
                    }
                    return 0;
                });
                let emptyPokemon = {
                    Name: 'Empty'
                };
                return [emptyPokemon, ...sortedPokemon];
            }
        },
        orderedItems() {
            return (index: number, pokemon: any) => {
                let items = this.options[index].Pokemon.find((poke: any) => poke.Name === pokemon)?.Items ?? [];
                let fossils = this.options[index].Fossils ?? [];
                let allItems = [...items, ...fossils];
                let sortedItems = allItems.sort((a: any, b: any) => {
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                    return 0;
                });
                return ['Empty', ...sortedItems];
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
        },
        getTotalItems() {
            const uniqueItems = [...new Set(this.items.map((item: RockRow) => item.Item as string))].filter((item: string) => item);
            const itemTotals = uniqueItems.map((item: string) => {
                return {
                    Name: item,
                    Totals: this.items.filter((pokemonItem: RockRow) => pokemonItem.Item && pokemonItem.Item === item).length
                }
            });
            return itemTotals
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

.pokemonImage {
    width: 70px;
    height: 35px;
}

.pokemonItem {
    height: 25px;
    width: 25px;
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
        <div class="grid grid-cols-5">
            <div class="items text-label text-center items-center m-2 p-4 hover:cursor-pointer border-black border hover:bg-blue-500"
                v-for="(option, index) in options" @click="setActiveRegion(index)"
                :class="{ active: index === selectedRegionIndex }">
                <span class="bg-black bg-opacity-50 text-white p-0.5">{{ option.Name }}</span>
            </div>
        </div>
        <h2 class="center">{{ options[selectedRegionIndex].Name }}</h2>
        <div v-for="(pokemon, index) in orderedPokemon(options[selectedRegionIndex].Pokemon)"
            class="grid grid-cols-8 place-content-evenly center text-center">
            <div v-for="(item, index) in orderedItems(selectedRegionIndex, pokemon.Name)"
                :style="getImageStyling(pokemon.Name)" :title="pokemon.Name + ' + ' + item"
                class="flex relative pokemonImage cursor-pointer hover:bg-red-500 m-0.5" v-if="pokemon.Name != 'Empty'"
                @click="addSmash(pokemon.Name, item)">
                <img :src="`/images/items/${item}.png`" alt="item" class="pokemonItem absolute right-0 bottom-0" />
            </div>
            <div class="flex relative pokemonImage cursor-pointer hover:bg-red-500 m-0.5"
                :style=getImageStyling(pokemon.Name) title="No Encounter" @click="addSmash(pokemon.Name, item)" v-else>
                <img :src="`/images/items/Empty.png`" alt="item" class="pokemonItem absolute right-0 bottom-0" />
            </div>
        </div>
        <div>
            <label for="ign">In-Game Name</label>
            <UInput v-model="ign" type="text" onValueChange="saveToLocalStorage" />
        </div>
        <div v-if="items.length > 0">
            <UDivider class="mt-6 mb-4" />
            <div class="grid grid-cols-1 text-center items-center">
                <b>Registered Smashes</b>
                <span><b>IGN:</b> {{ ign }}</span>
                <h2>Data</h2>
            </div>
            <p class="grid grid-cols-3 text-center">
                <span><b>Total smashes:</b> {{ items.length }}</span>
                <span><b>Total pokemon encountered:</b> {{ calculatedData.encounters }}</span>
                <span><b>Total items obtained:</b> {{ calculatedData.items }}</span>
            </p>
            <p class="grid grid-cols-1 text-center items-center">
                <h2>Data by Pokemon</h2>
            </p>
            <div class="grid grid-cols-4 text-center">
                <span v-for="pokemon in getPokemonItems">
                    <b>
                        {{ pokemon.pokemon }}
                    </b>
                    ({{ pokemon.totalEncounters }})
                    <div>
                        <b>
                            Items
                        </b>
                        ({{ pokemon.totalItems }})
                    </div>
                    <div v-for="item in pokemon.items">
                        <b>
                            {{ item.item }}
                        </b>
                        ({{ item.count }})
                    </div>
                </span>
            </div>
            <p class="grid grid-cols-1 text-center items-center">
                <h2>Data by Item</h2>
            </p>
            <div class="grid grid-cols-4 text-center">
                <span v-for="item in getTotalItems">
                    <b>
                        {{ item.Name }}
                    </b>
                    ({{ item.Totals }})
                </span>
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
            <UTable :rows="items" :columns="columns" v-model="selectedItems" class="bg-slate-200" />
        </div>
    </UContainer>
</template>