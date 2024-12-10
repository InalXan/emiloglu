<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/admin/login')
    },
  },
}
</script>

<template>
  <div class="header z-50">
    <button
      class="float-right m-2 p-2 font-bold text-primary text-md hover:underline"
      @click="logout"
    >
      Logout
    </button>
  </div>
  <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu" />
  <label for="openSidebarMenu" class="sidebarIconToggle">
    <div class="spinner diagonal part-1"></div>
    <div class="spinner horizontal"></div>
    <div class="spinner diagonal part-2"></div>
  </label>
  <div id="sidebarMenu" class="z-50">
    <ul class="sidebarMenuInner">
      <li><span>Anproduction</span></li>
      <li><RouterLink to="/admin/profile">Profil</RouterLink></li>
      <li><RouterLink to="/admin/category">Kategoriya</RouterLink></li>
      <li><RouterLink to="/admin/subcategory">Alt Kategoriya</RouterLink></li>
      <li><RouterLink to="/admin/products">Məhsullar</RouterLink></li>
      <li><RouterLink to="/admin/sponsors/one">Ölkə Daxili Tərəfdaşlar</RouterLink></li>
      <li><RouterLink to="/admin/sponsors/two">Xarici Tərəfdaşlar</RouterLink></li>
      <li><RouterLink to="/admin/inbox">Inbox</RouterLink></li>
    </ul>
  </div>
</template>

<style scoped>
.header {
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
  box-shadow: none;
  background-color: #fff;
  position: fixed;
  height: 60px !important;
  overflow: hidden;
}
.main {
  margin: 0 auto;
  display: block;
  height: 100%;
  margin-top: 60px;
}
.mainInner {
  display: table;
  height: 100%;
  width: 100%;
  text-align: center;
}
.mainInner div {
  display: table-cell;
  vertical-align: middle;
  font-size: 3em;
  font-weight: bold;
  letter-spacing: 1.25px;
}
#sidebarMenu {
  height: 100%;
  position: fixed;
  left: 0;
  width: 250px;
  margin-top: 60px;
  transform: translateX(-250px);
  transition: transform 250ms ease-in-out;
  background: #fff;
}
.sidebarMenuInner {
  margin: 0;
  padding: 0;
}
.sidebarMenuInner li {
  list-style: none;
  color: #eeee;
  text-transform: uppercase;
  font-weight: bold;
  padding: 20px;
  cursor: pointer;
}
.sidebarMenuInner li span {
  display: block;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}
.sidebarMenuInner li a {
  color: #dedede;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
}
input[type='checkbox']:checked ~ #sidebarMenu {
  transform: translateX(0);
}

input[type='checkbox'] {
  transition: all 0.3s;
  box-sizing: border-box;
  display: none;
}
.sidebarIconToggle {
  transition: all 0.3s;
  box-sizing: border-box;
  cursor: pointer;
  position: absolute;
  z-index: 99;
  height: 100%;
  width: 100%;
  top: 22px;
  left: 15px;
  height: 22px;
  width: 22px;
}
.spinner {
  transition: all 0.3s;
  box-sizing: border-box;
  position: absolute;
  height: 3px;
  width: 100%;
  background-color: #dedede;
}
.horizontal {
  transition: all 0.3s;
  box-sizing: border-box;
  position: relative;
  float: left;
  margin-top: 3px;
}
.diagonal.part-1 {
  position: relative;
  transition: all 0.3s;
  box-sizing: border-box;
  float: left;
}
.diagonal.part-2 {
  transition: all 0.3s;
  box-sizing: border-box;
  position: relative;
  float: left;
  margin-top: 3px;
}
input[type='checkbox']:checked ~ .sidebarIconToggle > .horizontal {
  transition: all 0.3s;
  box-sizing: border-box;
  opacity: 0;
}
input[type='checkbox']:checked ~ .sidebarIconToggle > .diagonal.part-1 {
  transition: all 0.3s;
  box-sizing: border-box;
  transform: rotate(135deg);
  margin-top: 8px;
}
input[type='checkbox']:checked ~ .sidebarIconToggle > .diagonal.part-2 {
  transition: all 0.3s;
  box-sizing: border-box;
  transform: rotate(-135deg);
  margin-top: -9px;
}
</style>
