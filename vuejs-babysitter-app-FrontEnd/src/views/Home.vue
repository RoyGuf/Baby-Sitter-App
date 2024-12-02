<template>
  <div class="justify-center w-full" dir="rtl">
    <div class=" h-80 first_img w-full">
    </div>
    <div class="p-10 text-center">
      <h1 class=" font-semibold text-2xl p-3">איך זה עובד?</h1>
      <p class="p-4">לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית גולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.</p>
    </div>
    <div class="p-10 text-center">
      <h1 class=" font-semibold text-2xl p-3">ועכשיו באמת?</h1>
      <p class="p-4">לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית גולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.</p>
    </div>
    <div class=" h-96 second_img w-full">
    </div>
    
  </div>
</template>

<script setup>

</script>


<style scoped>
.second_img{
  background-image: url("https://images.pexels.com/photos/265987/pexels-photo-265987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: 0px 100px;
  background-size: cover;
  background-position-x: center;
}
.first_img{
  background-image: url("https://images.pexels.com/photos/1741231/pexels-photo-1741231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: right;
  background-size: cover;
  background-position-x: center;

}
@media screen and (max-width: 768px) {
  .second_img{
    background-position: -320px 100px;
  }
  /* .first_img{
    background-position: -450px -80px;
  } */
}
</style>