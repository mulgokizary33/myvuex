<template>
  <div>
    <p>hello my name is {{ $store.state.name }}</p>
    <p>from getter: {{ $store.getters.getName }}</p>
    <p>name and age: {{ $store.getters.getFullName('morrison') }}  </p>
    <div>
      <p>count: {{ $store.state.count }}</p>
      <button @click="clickPlus">+</button>
      <button @click="clickMinus">-</button>
      <button @click="clickReset">1秒后重置</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleVuex',
  methods: {
    clickPlus () {
      this.$store.commit('increment')
    },
    clickMinus () {
      this.$store.commit('decrement')
    },
    clickReset () {
      this.$store.dispatch('reset', 0)
    }
  }
}
</script>
