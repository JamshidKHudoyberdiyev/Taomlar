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

  <div v-else class="index">
    <div
      v-for="smooth in smoothies"
      :key="smooth.id"
      class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow card relative"
    >
      <div class="flex justify-end">
        <i
          class="bx bxs-trash-alt cursor-pointer"
          @click="deleteItem(smooth.id)"
          style="font-size: 20px"
        ></i>
      </div>
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {{ smooth.title }}
        </h5>
      </a>
      <ul>
        <li v-for="(item, index) in smooth.ingredients" class="ingredints" :key="index">
          <span
            class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full"
            >{{ item }}</span
          >
        </li>
      </ul>
      <div
        class="bg-pink-500 w-10 h-10 flex items-center justify-center cursor-pointer absolute rounded-full bottom-3 right-3"
      >
        <i
          class="bx bxs-edit-alt"
          @click="throwEdit(smooth)"
          style="font-size: 25px; color: white"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import { collection, getDocs, doc, deleteDoc, getFirestore } from 'firebase/firestore'
export default {
  name: 'Index',
  data() {
    return {
      smoothies: [
        // {
        //   title: 'ninja Brew',
        //   slug: 'ninja-brew',
        //   ingredients: ['bananas', 'coffee', 'milk'],
        //   id: 1
        // },
        // {
        //   title: 'morning banans ',
        //   slug: 'morning-moods',
        //   ingredients: ['apple', 'milk', 'cofee', 'sugar'],
        //   id: 2
        // },
        // {
        //   title: 'night apple',
        //   slug: 'morning-moods',
        //   ingredients: ['apple', 'pear', 'tea', 'grip'],
        //   id: 3
        // }
      ],
      isBusy: true
    }
  },
  methods: {
    deleteItem(id) {
      const db = getFirestore()
      const docRef = doc(db, 'ichimliklar', `${id}`)

      deleteDoc(docRef)
        .then(() => {
          this.smoothies = this.smoothies.filter((item) => item.id != id)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getData() {
      const querySnapshot = await getDocs(collection(db, 'ichimliklar'))
      let arr = []
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id })
      })
      this.smoothies = arr
      this.isBusy = false
    },
    throwEdit(item) {
      this.$router.push({ name: 'EditProduct', params: { product_slug: `${item.slug}` } })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.index {
  display: flex;
  margin-top: 60px;
  gap: 60px;
  padding-left: 30px;
}

.card {
  height: 200px;
  width: 350px;
}

.card ul {
  padding-top: 30px;
}

.ingredints {
  display: inline-block;
}

.status {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
