<template>
  <div v-if="isBusy" class="status" role="status">
    <svg
      aria-hidden="false"
      class="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  </div>
  <div>
    <form class="max-w-xl mx-auto mt-10" v-if="product">
      <h1 class="my-5 font-extrabold text-xl">
        <span style="color: blue; text-transform: uppercase">{{ product.title }}</span> tarkibini
        o'zgartirish
      </h1>
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900"></label>
        <input
          v-model="product.title"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      <div class="my-2" v-if="product.ingredients.length">
        <div
          v-for="(item, index) in product.ingredients"
          :key="index"
          class="flex items-center gap-1"
        >
          <input
            v-model="product.ingredients[index]"
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
        @click.prevent="UpdateProduct"
        class="text-white bg-blue-700 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800"
      >
        O'zgartirish
      </button>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'

export default {
  name: 'EditProduct',
  data() {
    return {
      product: null,
      item: null,
      feedbeck: '',
      isBusy: true
    }
  },
  created() {
    const q = query(
      collection(db, 'ichimliklar'),
      where('slug', '==', this.$route.params.product_slug)
    )

    getDocs(q).then((res) => {
      res.forEach((doc) => {
        this.product = doc.data()
        this.product.id = doc.id
        // console.log(doc.data())
      })
      this.isBusy = false
    })
  },
  computed: {
    slug2() {
      return slugify(this.product.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true
      })
    }
  },
  methods: {
    deleteProductItem(item, index) {
      this.product.ingredients = this.product.ingredients.filter((itm, inx) => {
        return inx != index
      })
    },
    UpdateProduct() {
      const washingtonRef = doc(db, 'ichimliklar', this.product.id)
      updateDoc(washingtonRef, {
        title: this.product.title,
        ingredients: this.product.ingredients,
        slug: this.slug2
      })
        .then(() => this.$router.push({ name: 'Index' }))
        .catch((error) => {
          console.log(error)
        })

      // if (this.product.title) {
      //   this.feedbeck = null
      //   if (this.product.ingredients.length !== 0) {
      //     this.feedbeck = null
      //     setDoc(newProduct, {
      //       title: this.product.title,
      //       slug: this.product.slug2,
      //       ingredients: this.product.ingredients
      //     }).then(() => {
      //       this.$router.push({ name: 'Index' })
      //     })
      //   } else {
      //     this.feedbeck = "maxsulot tarkibi bo'sh bo'lmasligi kerak "
      //   }
      // } else {
      //   this.feedbeck = " ichimlik nomi bo'sh bo'lmasligi kerak"
      // }
    },
    addItemIngredent() {
      if (this.item) {
        this.product.ingredients.push(this.item)
        this.item = null
        this.feedbeck = ''
      } else {
        this.feedbeck = 'malumot kiritmadingi '
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.status {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
