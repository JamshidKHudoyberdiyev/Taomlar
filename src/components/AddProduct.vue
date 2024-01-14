<template>
  <form class="max-w-xl mx-auto mt-10">
    <h1 class="my-5 font-extrabold text-xl">Yangi taom yoki ichimlik qo'shish</h1>
    <div class="mb-5">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Nomi</label>
      <input
        v-model="title"
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </div>

    <div class="my-2" v-if="ingredients.length">
      <div v-for="(item, index) in ingredients" :key="index" class="flex items-center gap-1">
        <input
          v-model="ingredients[index]"
          type="text"
          class="my-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <i
          @click="deleteProductItem(item, index)"
          class="bx bxs-trash-alt text-[20px] cursor-pointer"
        ></i>
      </div>
    </div>
    <div class="mb-5">
      <label for="text" class="block mb-2 text-sm font-medium text-gray-900">Tarkibi</label>
      <input
        v-model="item"
        @keydown.tab.prevent="addItemIngredent"
        type="text"
        id="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </div>

    <p class="text-red-400 my-2">
      {{ feedbeck }}
    </p>
    <button
      type="submit"
      @click.prevent="addProduct"
      class="text-white bg-blue-700 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800"
    >
      Ro'yxatga qo'shish
    </button>
  </form>
</template>

<script>
import db from '@/firebase/init'
import { collection, doc, setDoc } from 'firebase/firestore'
import slugify from 'slugify'
export default {
  name: 'AddProduct',

  data() {
    return {
      title: '',
      ingredients: [],
      item: null,
      feedbeck: ''
    }
  },

  methods: {
    addProduct() {
      const newProduct = doc(collection(db, 'ichimliklar'))

      if (this.title) {
        this.feedbeck = null
        if (this.ingredients.length !== 0) {
          this.feedbeck = null
          setDoc(newProduct, {
            title: this.title,
            slug: this.slug2,
            ingredients: this.ingredients
          }).then(() => {
            this.$router.push({ name: 'Index' })
          })
        } else {
          this.feedbeck = "maxsulot tarkibi bo'sh bo'lmasligi kerak "
        }
      } else {
        this.feedbeck = " ichimlik nomi bo'sh bo'lmasligi kerak"
      }
    },
    deleteProductItem(item, index) {
      this.ingredients = this.ingredients.filter((itm, inx) => {
        inx != index
      })
      console.log(item, index)
    },

    addItemIngredent() {
      if (this.item) {
        this.ingredients.push(this.item)
        this.item = null
        this.feedbeck = ''
      } else {
        this.feedbeck = ' malumot kiritmadingi '
      }
    }
  },
  computed: {
    slug2() {
      return slugify(this.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
