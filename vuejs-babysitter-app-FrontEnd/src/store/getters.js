// Babysitter 

export function getBabysittersWithRate(state){
  // console.log(state.searchedBabySitters.data);
  for (let index = 0; index < state.searchedBabySitters.data.length; index++) {
    const babysitter = state.searchedBabySitters.data[index];
    let sum = 0;
    for (let i = 0; i < babysitter.reviews.length; i++) {
      const review = babysitter.reviews[i];
      sum += Number(review.rate);
    }
    if(!babysitter.reviews.length) babysitter.avgRate = 0
    else babysitter.avgRate = (sum / babysitter.reviews.length).toFixed(1)
  }
  return state.searchedBabySitters.data;
}

export function getCurrentBabysitter(state){
  let sum = 0;
  for (let i = 0; i < state.currentBabySitter.reviews.length; i++) {
    const review = state.currentBabySitter.reviews[i];
    sum += Number(review.rate);
  }
  if(!state.currentBabySitter.reviews.length) state.currentBabySitter.avgRate = 0;
  else state.currentBabySitter.avgRate = (sum / state.currentBabySitter.reviews.length).toFixed(1);
  return state.currentBabySitter;
}

// Customer

export function getCurrentCustomer(state){
  return state.currentCustomer;
}

// Auth

export function getAuthentication(state){
  return state.authenticated;
}