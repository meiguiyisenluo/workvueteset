<template>
  <div>
    <div>从相册选择</div>
    <input type="file" accept="image/*" capture="filesystem" />
    <div>后置摄像头</div>
    <input type="file" accept="image/*" capture="environment" />
    <div>前置摄像头</div>
    <input type="file" accept="image/*" capture="user" />
  </div>
</template>
<script>
export default {}
</script>
