<template>
  <div id="progress" class="shadow-xl">
    <span id="progress-value" class="shadow-xl">&#x1F815;</span>
  </div>
</template>

<script setup>
let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  });
  scrollProgress.style.background = `conic-gradient(#cb4e3a ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};
window.onscroll = calcScrollValue;
window.onload   = calcScrollValue;
</script>

<style scoped>
#progress {
  position: fixed;
  bottom: 20px;
  right: 10px;
  height: 70px;
  width: 70px;
  display: none;
  place-items: center;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  background: #cb4e3a;
  transition: 0.2s ease-out;

}
#progress-value {
  display: block;
  height: calc(100% - 15px);
  width: calc(100% - 15px);
  background-color: #eee;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 35px;
  color: #001a2e;
}
</style>