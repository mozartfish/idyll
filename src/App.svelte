<script>
  import Header from "./lib/Header.svelte";
  import Footer from "./lib/Footer.svelte";
  import Introduction from "./lib/Introduction.svelte";

  // @ts-ignore
  import * as d3 from "d3";
  import { onMount } from "svelte";

  let cleanedData = $state([]);
  // processing and handling data
  async function loadData() {
    console.log("enter the load data function");
    d3.csv("anscombe.csv")
      .then((rawData) => {
        // parse data
        rawData.forEach((record) => {
          record.x = +record.x;
          record.y = +record.y;
        });

        // store data in the state variable
        cleanedData = rawData;
      })
      .catch((error) => {
        console.log("Error loading data: ", error);
      });
  }

  // debugging
  console.log("hello, world welcome to idyll");
  console.log("this is the app.svelte component aka the main component");

  // svelte component app component set up
  onMount(async () => {
    await loadData();
  });
  $effect(() => {
    console.log("DATA", cleanedData);
  });
</script>

<main>
  <Introduction />
  <!-- <Header />
  <p>this is content </p>
  <Footer /> -->
</main>

<!-- <script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
</script>

<main>
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style> -->

<style></style>
