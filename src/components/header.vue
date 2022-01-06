<template>
  <div class="header-wrapper row m-0">
    <div class="header-logo-wrapper">
      <div class="logo-wrapper">
        <router-link to="/">
          <img class="img-fluid" src="../assets/images/logo/logo.png" alt />
        </router-link>
      </div>
      <div class="toggle-sidebar" @click="toggle_sidebar">
        <feather class="status_toggle middle sidebar-toggle" type="sliders" id="sidebar-toggle"></feather>
      </div>
    </div>
    <div class="nav-right col-12 pull-right right-header p-0">
      <ul class="nav-menus">
        <li class="onhover-dropdown">
          <div class="notification-box">
            <feather type="bell"></feather>
            <span class="badge badge-pill badge-secondary">4</span>
          </div>
          <ul class="notification-dropdown onhover-show-div">
            <li>
              <feather type="bell"></feather>
              <h6 class="f-18 mb-0">Notitications</h6>
            </li>
            <li>
              <p>
                <i class="fa fa-circle-o mr-3 font-primary"></i>Delivery
                processing
                <span class="pull-right">10 min.</span>
              </p>
            </li>
            <li>
              <p>
                <i class="fa fa-circle-o mr-3 font-success"></i>Order
                Complete
                <span class="pull-right">1 hr</span>
              </p>
            </li>
            <li>
              <p>
                <i class="fa fa-circle-o mr-3 font-info"></i>Tickets
                Generated
                <span class="pull-right">3 hr</span>
              </p>
            </li>
            <li>
              <p>
                <i class="fa fa-circle-o mr-3 font-danger"></i>Delivery
                Complete
                <span class="pull-right">6 hr</span>
              </p>
            </li>
            <li>
              <a class="btn btn-primary" href="#">Check all notification</a>
            </li>
          </ul>
        </li>
        <li>
          <div class="mode">
            <i
              class="fa fa-moon-o"
              v-show="mixLayout == 'light-only'"
              @click="customizeMixLayout('dark-only')"
            ></i>
            <i
              class="fa fa-lightbulb-o"
              v-show="mixLayout == 'dark-only'"
              @click="customizeMixLayout('light-only')"
            ></i>
          </div>
        </li>
        <li class="profile-nav onhover-dropdown p-0 mr-0">
          <div class="media profile-media">
            <div class="media-body">
              <span>{{usuario.nombre}} {{usuario.apellido}}</span>
              <p class="mb-0 font-roboto">
                {{usuario.tipo}}
                <i class="middle fa fa-angle-down"></i>
              </p>
            </div>
          </div>
          <ul class="profile-dropdown onhover-show-div">
            <li>
              <a href="#">
                <feather type="user"></feather>
                <span>Account</span>
              </a>
            </li>
            <li>
              <a href="#">
                <feather type="mail"></feather>
                <span>Inbox</span>
              </a>
            </li>
            <li>
              <a href="#">
                <feather type="file-text"></feather>
                <span>Taskboard</span>
              </a>
            </li>
            <li>
              <a href="#">
                <feather type="settings"></feather>
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a @click="logout">
                <feather type="log-in"></feather>
                <span>Log out</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <script class="result-template" type="text/x-handlebars-template">
  <div class="ProfileCard u-cf">
    <div class="ProfileCard-avatar">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-airplay m-0"
      >
        <path
          d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"
        ></path>
        <polygon points="12 15 17 21 7 21 12 15"></polygon>
      </svg>
    </div>
    <div class="ProfileCard-details">
      <div class="ProfileCard-realName">
        name
      </div>
    </div>
  </div>
    </script>
    <script class="empty-template" type="text/x-handlebars-template">
  <div class="EmptyMessage">
    Your search turned up 0 results. This most likely means the backend is down,
    yikes!
  </div>
    </script>
  </div>
</template>
<script>
var body = document.getElementsByTagName("body")[0];
export default {
  name: "Search",
  data() {
    return {
      terms: "",
      searchOpen: false,
      searchResult: false,
      searchResultEmpty: false,
      close_sidebar_var: false,
      clicked: false,
      mobile_toggle: false,
      mobile_search: false,
      openbonusUI: false,
      openLevelmenu: false,
      openlanguage: false,
      mobile_accordian: false,
      mixLayout: "light-only",
    };
  },

  computed: {
    // ...mapState({
    //   usuario: (state) => state.authentication.user,
    // }),
    usuario() {
      return this.$store.state.authentication.user;
    },
  },
  methods: {
    toggle_sidebar() {
      this.$store.dispatch("menu/opensidebar");
    },
    setNavActive(item) {
      this.$store.dispatch("menu/setBonusNavActive", item);
    },
    openlangpicker() {
      this.openlanguage = !this.openlanguage;
    },
    openlevelmenu() {
      this.openLevelmenu = !this.openLevelmenu;
    },
    changeLocale(locale) {
      this.setLang(locale);
    },
    mobileaccordian() {
      this.mobile_accordian = !this.mobile_accordian;
    },
    addFix() {
      body.classList.add("offcanvas");
      this.searchResult = true;
    },
    removeFix() {
      body.classList.remove("offcanvas");
      this.searchResult = false;
      this.terms = "";
    },
    toggle_fullscreen() {
      if (
        (document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)
      ) {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    customizeMixLayout(val) {
      this.mixLayout = val;
      this.$store.dispatch("layout/setLayout", val);
    },
    logout() {
      this.$store.dispatch("authentication/logout");
      this.$router.replace("/auth/login");
    },
  },
  watch: {
    "$i18n.locale"(to, from) {
      if (from !== to) {
        this.$router.go(this.$route.path);
      }
    },
  },
};
</script>
