let Vue

const keysForEach = (obj, cb) => {
  Object.keys(obj).forEach(key => {
    cb(key, obj[key])
  })
}

class Store {
  constructor (options = {}) {
    // 利用vue实例使state实现响应式
    this.vm = new Vue({
      data: {
        state: options.state
      }
    })
    // getter
    this.getters = {}
    const getters = options.getters || {}
    keysForEach(getters, (getterName, getterFunc) => {
      // getter通过函数访问
      this.getters[getterName] = (arg) => {
        return getterFunc(this.state)(arg)
      }
      Object.defineProperty(this.getters, getterName, {
        // getter通过属性访问
        get: () => {
          return getterFunc(this.state, this.getters)
        }
      })
    })

    // mutations
    const mutations = options.mutations || {}
    this.mutations = {}
    keysForEach(mutations, (mutationName, mutationFunc) => {
      this.mutations[mutationName] = (payload) => {
        mutationFunc(this.state, payload)
      }
    })

    // actions
    const actions = options.actions || {}
    this.actions = {}
    keysForEach(actions, (actionName, actionFunc) => {
      this.actions[actionName] = (payload) => {
        actionFunc(this, payload)
      }
    })
  }

  get state () {
    return this.vm.state
  }

  commit = (type, payload) => {
    if (!this.mutations[type]) {
      console.warn('不合法的mutations')
      return
    }
    this.mutations[type](payload)
  }

  dispatch = (type, payload) => {
    if (!this.actions[type]) {
      console.warn('不合法的actions')
      return
    }
    this.actions[type](payload)
  }
}

function install (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        this.$store = this.$options.store
      } else {
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

export default { Store, install }
