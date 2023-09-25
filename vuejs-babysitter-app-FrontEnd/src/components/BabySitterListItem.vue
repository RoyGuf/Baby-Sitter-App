<template>
  <div  class="bg-white shadow-md rounded-xl max-[600px]:gap-5">
      <router-link :to="{ name: 'babysitterDetails', params: {id: babySitter._id} }">
        <div class="flex flex-row p-3">
          <img :src="babySitter.avatar.url" 
             :alt="babySitter.firstName + ' ' + babySitter.lastName"
             :title="babySitter.firstName + ' ' + babySitter.lastName"
             class="md:w-2/5 w-1/2 basis-1/4 rounded-xl inline h-52 object-fill p-2">
             <div class="p-5 inline basis-3/4">
                <h3 class="p-3 py-1 font-semibold block text-xl">{{ babySitter.firstName + ' ' + babySitter.lastName }}</h3>
                <p class="p-3 block">{{ babySitter.description }}</p>
             </div>
        </div>
        <div class="p-3">
          <div class="p-3  py-1 grid grid-cols-3">
            <p class="py-1"><strong>גיל: </strong>{{ babySitter.age }}</p>
            <!-- <p class="py-1"><strong>מגדר: </strong>{{ babySitter.gender }}</p> -->
            <p class="py-1"><strong>עיר: </strong>{{ babySitter.address ? babySitter.address.city : "" }}</p>
            <p class="py-1"><strong>תעריף לשעה: </strong>{{ babySitter.price }} ₪</p>
            <p class="py-1"><strong>מספר ביקורות: </strong>{{ babySitter.reviews.length || 0 }}</p>
            <p class="py-1"><strong>דירוג: </strong><star-rating
            class="w-20 px-1 inline"
            :increment="0.1"
            :border-width="1"
            :rtl="true"
            :show-rating="false"
            :rounded-corners="true" 
            :inline="true"
            :read-only="true"
            :star-size="17"
            :rating="Number(babySitter.avgRate)"></star-rating></p>
            <div>
              <span alt="קיים מייל" title="קיים מייל" v-if="babySitter.phone" class="icon material-symbols-outlined">
                mark_email_read
              </span>
              <span alt="קיים טלפון" title="קיים טלפון" v-if="babySitter.email" class="material-symbols-outlined">
                mobile_friendly
              </span>
            </div>
          </div>
          <div class="flex items-center w-full p-1 bottom-0 pt-5">
            <router-link :to="{ name: 'babysitterDetails', params: {id: babySitter._id}}"
              class="font-semibold w-full text-center p-3 rounded border-[#db8e82] border-2 hover:bg-white hover:text-black bg-[#db8e82ba] text-white">
              פרטים
            </router-link>
          </div>
        </div>  
      </router-link>
    </div>
</template>

<script setup>
import StarRating from 'vue-star-rating';

const { babySitter } = defineProps({
  babySitter: Object
})
</script>

<style scoped>

:deep(.sr-only){display:none !important}
@media screen and (max-width: 768px) {
  span.material-symbols-outlined{
    margin-right: 15px;
    top: 5px;
    font-size: 24px;
  }
}
  .material-symbols-outlined{
    color: green;
    margin-right: 0.5em;
    margin-top: 0.5em;
    position: relative;
    display: inline-block;
    font-size: 25px;
  }
</style>