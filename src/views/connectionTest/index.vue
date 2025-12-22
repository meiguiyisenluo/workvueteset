<template>
  <div>
    <p>connection</p>
    <p>downlink {{ connection.downlink }}</p>
    <p>effectiveType {{ connection.effectiveType }}</p>
    <p>rtt {{ connection.rtt }}</p>
    <p>saveData {{ connection.saveData }}</p>
  </div>
</template>

<script>
alert(window.navigator.connection)
export default {
  data() {
    return {
      connection: window.navigator.connection,
    }
  },
}
</script>

<style></style>
