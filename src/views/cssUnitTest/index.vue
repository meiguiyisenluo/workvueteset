<template>
  <div>cssUnitTest</div>
</template>
<script>
export default {
  created() {
    alert(CSS?.supports?.('height', '1dvh'))
  },
}
</script>
