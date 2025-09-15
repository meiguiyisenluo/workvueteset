<template>
  <section>
    <main>main</main>
    <header>header</header>
    <aside>aside</aside>
    <footer>footer</footer>
  </section>
</template>

<script>
export default {
  name: 'gridTest2',
}
</script>

<style scoped lang="less">
section {
  width: 100vw;
  height: 100vh;

  padding: 10px;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 200px 1fr;
  grid-auto-rows: 50px 1fr 30px;
  gap: 5px;
  grid-template-areas: 'header header' 'aside main' 'aside footer';

  font-size: 16px;
  color: #ffffff;

  & > * {
    display: grid;
    place-items: center;
    border-radius: 5px;
  }

  header {
    grid-area: header;
    background-color: red;
  }

  main {
    grid-area: main;
    background-color: blue;
  }

  aside {
    grid-area: aside;
    background-color: green;
  }

  footer {
    grid-area: footer;
    background-color: darkblue;
  }
}
</style>
