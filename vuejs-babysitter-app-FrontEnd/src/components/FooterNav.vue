<template>
  <footer class="">
    <div class="shadow-inner shadow-gray-500/20 h-auto bg-[#d3887c73] block w-full relative bottom-0 p-6 md:p-10">
      <div class="socialIcons flex justify-center">
        <a href=""><i class="fa-brands fa-facebook"></i></a>
        <a href=""><i class="fa-brands fa-instagram"></i></a>
        <a href=""><i class="fa-brands fa-twitter"></i></a>
        <a href=""><i class="fa-brands fa-youtube"></i></a>
        <a href=""><i class="fa-brands fa-whatsapp"></i></a>
      </div>
      <div class="mx-18 md:mx-24 my-10 footerNav">
        <ul class="flex justify-center">
          <li><router-link to="/" class="nav-link">ראשי</router-link></li>
          <li><router-link to="/about" class="nav-link">אודות</router-link></li>
          <li><router-link to="/about" class="nav-link">יצירת קשר</router-link></li>
          <li><router-link to="/about" class="nav-link">חדש!</router-link></li>
          <li><router-link to="/about" class="nav-link">הצוות שלנו</router-link></li>
        </ul>
      </div>
    </div>
    <div class="bg-[#db8e82] p-7 w-full text-center text-lg shadow-inner shadow-gray-500/20">
        <p>CopyRight &copy;2023, Designed by <span class="designer">Roy</span></p>
      </div>
  </footer>

</template>

<script setup>
const letters = 'אבגדהוזחטיכלמנסעפצקרשת';

</script>

<style scoped>
.socialIcons a{
  text-decoration: none;
  padding: 10px;
  background-color: #eee;
  margin: 10px;
  border-radius: 50%;
  
}
.socialIcons a i{
  font-size: 2.5em;
  color: #232323;
  opacity: 0.9;
  
}
.socialIcons a:hover{
  background-color: transparent;
  transition: 0.3s;
}
.socialIcons a:hover i{
  color: #fff;
  transition: 0.3s;
}
.footerNav ul li a{
  color: #0a0a0a;
  margin: 20px;
  text-decoration: none;
  font-size: 1.3em;
  opacity: 0.7;
  transition: 0.3s;
}
.footerNav ul li:hover a{
  opacity: 1;
}
.designer{
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 400;
  margin:  0 5px;
}

@media screen and (max-width: 768px) {
  .footerNav ul{
    flex-direction: column;
  }
  .footerNav ul li{
    width: 100%;
    text-align: center;
    margin: 10px;
    list-style: none;
  }
  .socialIcons a i{
    font-size: 2em;
  }
}
</style>