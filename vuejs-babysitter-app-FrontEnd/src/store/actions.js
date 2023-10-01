import axiosClient from '../axiosClient.js'

// Babysitter

export function getAllBabySitters({ commit }){
  return axiosClient.get(`/babysitter/listFull`)
  .then(({data}) => {
    commit('setAllBabySitters', data);
  });
};

export function searchBabySitters({ commit }, keyword){
  commit('setSearchedBabySitters', keyword);
};

export function filterBabySittersByAge({ commit }, age){
  commit('setFilteredBabySittersByAge', age);
};

export function sortBabySitters({ commit }, {keyword, acd}){
  commit('setSortedBabySitters', {keyword, acd});
};

export function searchBabySitterById({ commit }, id){
  return axiosClient.get(`/babysitter/${id}`)
  .then(({data}) => {
    commit('setCurrentBabySitter', data);
  });
};

export function searchBabySittersByAges({ commit }, ages){
  return axiosClient.get(`/babysitter/ages/${ages}`)
  .then(({data}) => {
    commit('setBabySittersByAges', data);
  });
};

export function createBabySitter({ commit }, data){
  return axiosClient.post(`/babysitter`, data)
};

export function updateBabySitter({ commit }, {data, id}){
  console.log(data);
  return axiosClient.post(`/babysitter/${id}`, data)
  .then((babysitter) => {
    commit('setLoggedInBabySitter', babysitter.data);
    return {message: "success"}
  })
};

export function deleteMediaFromBabySitter({ commit }, {babysitterId, mediaId}){
  return axiosClient.delete(`/babysitter/${babysitterId}/removeMedia/${mediaId}`)
  .then((babysitter) => {
    commit('setLoggedInBabySitter', babysitter.data);
    return {message: "success"}
  })
};

// Customer

export function searchCustomerById({ commit }, id){
  return axiosClient.get(`/customer/${id}`)
  .then(({data}) => {
    commit('setCurrentCustomer', data);
  });
};


// Auth

export function getAuthentication({ commit }, next){
  return axiosClient.get(`/auth/user`)
  .then(({data}) => {
    commit('setLoggedInBabySitter', data);
    return {message: "success"}
  })
  .catch(next)
};

export function setAuth({ commit }, auth){
  commit('setAuth', auth)
};

export function register({ commit }, babysitter){
  return axiosClient.post(`/auth/register`, babysitter)
  // .then((data) => {
  //   commit('setCurrentCustomer', data);
  // });
};

export function login({ commit }, data){
  
  return axiosClient.post(`/auth/login`, data)
  .then(({data}) => {
    localStorage.setItem("isAuthenticated", JSON.stringify({
      value: true,
      expDate: new Date().setDate(new Date().getDate() + 1)
    }));
    commit('setLoggedInBabySitter', data);
    commit('setAuth', true)
  });
};

export function logout({ commit }, data){
  return axiosClient.post(`/auth/logout`, data)
  .then((res) => {
    localStorage.removeItem("isAuthenticated");
    commit('setLoggedInBabySitter', {});
    commit('setAuth', false)
  });
};

// Review

export function createReview({ commit }, data){
  return axiosClient.post(`/review`, data)
};