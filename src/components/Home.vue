<template>
  <div class="home">
    <h1>Home</h1>
    <h2>MULE FROZEN</h2>
    <div>
      <span>QTY: {{ mule.qty }}</span>
      <span> - </span>
      <span>PRICE: <b>{{ mule.frozenPrice }}</b></span>
      <span> => </span>
      <span>Mule Frozen: <b>{{ muleFrozenValue }}</b></span>
    </div>
    <h2>SALESFORCE</h2>
    <div>
      <span>QTY: {{ salesforce.qty }}</span>
      <span> - </span>
      <span>PRICE: <b>{{ salesforce.price }}</b></span>
      <span> => </span>
      <span>Salesforce: <b>{{ salesForceValue }}</b></span>
    </div>
    <h2>MULE</h2>
    <div>
      <span>QTY: {{ mule.qty }}</span>
      <span> - </span>
      <span>PRICE: <b>{{ mule.price }}</b></span>
      <span> => </span>
      <span>Selling before conversion: <b><big>{{ muleValue }}</big></b></span>
    </div>
    <h2>TOTAL AFTER CONVERSION</h2>
    <div>
      <span>Total: <b><big>{{ totalAfterConversion }}</big></b></span>
    </div>
    <div v-if="totalAfterConversion > muleValue">
      <big><b>:D => let's sell after</b></big>
    </div>
    <div v-else>
      <big><b>:( => hurry up</b></big>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data: function () {
    return {
      mule: {
        frozenPrice: 0,
        price: 0,
        qty: 0
      },
      salesforce: {
        price: 0,
        qty: 0
      },
      apiUri: this.$root.$data.apiUri,
      token: this.$root.$data.token
    }
  },

  computed: {
    muleFrozenValue: function () {
      return this.mule.frozenPrice * this.mule.qty
    },
    salesForceValue: function () {
      return this.salesforce.price * this.salesforce.qty
    },
    muleValue: function () {
      return this.mule.price * this.mule.qty
    },
    totalAfterConversion: function () {
      return this.muleFrozenValue + this.salesForceValue
    }
  },

  created: function () {
    console.log('Home::created')
    let self = this
    if (!this.token) {
      this.token = prompt('Enter the token for the first time')
      this.$root.$ls.set('token', this.token)
    }
    axios.get(this.apiUri, {'headers': {'Authorization': this.token}}).then(response => {
      self.mule = response.data.mule
      self.salesforce = response.data.salesForce
      // self.mule.frozenPrice = response.data.mule.frozenPrice
      // self.mule.price = response.data.mule.price
      // self.mule.qty = response.data.mule.qty
    }).catch(error => {
      console.log(error)
      if (error.response.status === 401) {
        this.$root.$ls.remove('token')
      }
    })
  }
}

</script>
