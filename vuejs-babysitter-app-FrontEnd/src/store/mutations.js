// Babysitter

export function setAllBabySitters(state, babysitters) {
  state.babySitters.data = babysitters;
};

export function setSearchedBabySitters(state, keyword) {
  let babysittersArray = [];
  for (let index = 0; index < state.babySitters.data.length; index++) {
    const babysitter      = state.babySitters.data[index];
    let babysitterAddress = babysitter.address ? `${babysitter.address.city} ${babysitter.address.details}` : '';
    let regex             = new RegExp( keyword, "i");
    if(keyword == ' '){
      babysittersArray.push(babysitter)
    }else{
      if(regex.test(babysitter.firstName) || 
       regex.test(babysitter.lastName) || 
       regex.test(babysitterAddress)){
        babysittersArray.push(babysitter)
      }
    }
  }
  state.searchedBabySitters.data = babysittersArray;
};

export function setFilteredBabySittersByAge(state, keyword) {
  let babysittersArray = [];
  // let currentBabySitterList = (state.searchedBabySitters.data && state.searchedBabySitters.data.length > 0) ? state.searchedBabySitters.data : state.babySitters.data;
  for (let index = 0; index < state.babySitters.data.length; index++) {
    const babysitter = state.babySitters.data[index];
    let regex        = new RegExp( keyword, "i");
    // let babysitterAddress = babysitter.address ? `${babysitter.address.city} ${babysitter.address.details}` : '';
    if(keyword == ' '){
      babysittersArray.push(babysitter)
    }else{
      if(regex.test(babysitter.ageGroups)){
        babysittersArray.push(babysitter)
      }
    }
  }
  state.searchedBabySitters.data = babysittersArray;
};

export function setSortedBabySitters(state, {keyword, acd}) {
  let babysittersArray = [];
  let currentBabySitterList = (state.searchedBabySitters.data && state.searchedBabySitters.data.length > 0) ? state.searchedBabySitters.data : state.babySitters.data;
  if(keyword == "reviews.length"){
    babysittersArray = [...currentBabySitterList].sort((a,b) => {
      let firstObj = a.reviews.length
      let secondObj = b.reviews.length
      return (parseFloat(firstObj) > parseFloat(secondObj)) ? 1 : ((parseFloat(secondObj) > parseFloat(firstObj)) ? -1 : 0)
    }).reverse()
  }else if(keyword == " "){
    babysittersArray = currentBabySitterList
  }else{
    if(!acd){
      babysittersArray = [...currentBabySitterList].sort((a,b) => {
        return (parseFloat(a[keyword]) > parseFloat(b[keyword])) ? 1 : ((parseFloat(b[keyword]) > parseFloat(a[keyword])) ? -1 : 0)
      }).reverse()
    }else{
      babysittersArray = [...currentBabySitterList].sort((a,b) => {
        return (parseFloat(a[keyword]) > parseFloat(b[keyword])) ? 1 : ((parseFloat(b[keyword]) > parseFloat(a[keyword])) ? -1 : 0)
      })
    }
  }
  state.searchedBabySitters.data = babysittersArray;
};

export function setCurrentBabySitter(state, babysitter) {
  state.currentBabySitter = babysitter;
};

export function setLoggedInBabySitter(state, babysitter) {
  state.loggedInBabySitter = babysitter;
};

export function setBabySittersByAges(state, babysitters) {
  state.searchedBabySitters.data = babysitters;
};


// Customer

export function setCurrentCustomer(state, customer) {
  state.currentCustomer = customer;
};


// Auth

export function setAuth(state, auth) {
  state.authenticated = auth
};
