export const setShop = ({ commit }, shop) => {
    commit('addGoodsToShop', shop)
}
export const setOrders = ({ commit }, order) => {
    commit('addOrder', order)
}