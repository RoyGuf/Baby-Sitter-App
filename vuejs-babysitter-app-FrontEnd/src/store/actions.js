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
  .catch(next)
};

export function setAuth({ commit }, auth){
  commit('setAuth', auth)
};

export function register({ commit }, babysitter){
  return axiosClient.post(`/auth/register`, babysitter)
  .then((data) => {
    commit('setCurrentCustomer', data);
  });
};

export function login({ commit }, data){
  localStorage.setItem("isAuthenticated", JSON.stringify({
    value: true,
    expDate: new Date().setDate(new Date().getDate() + 1)
  }));
  return axiosClient.post(`/auth/login`, data)
  .then((res) => {
    commit('setAuth', true)
  });
};

export function logout({ commit }, data){
  return axiosClient.post(`/auth/logout`, data)
  .then((res) => {
    localStorage.removeItem("isAuthenticated");
    commit('setAuth', false)
  });
};

// Review

export function createReview({ commit }, data){
  return axiosClient.post(`/review`, data)
};