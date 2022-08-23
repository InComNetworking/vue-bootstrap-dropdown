<style lang="scss">
#app {
  padding: 2rem;
  font-weight: normal;
  width: 100%;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }
}
.root {
  position: relative;
  padding: 2em 0;
  margin-top: 2em;
  margin-bottom: 2em;
  border-bottom: 1px solid #ccc;
}
.root::before {
  content: "";
  position: absolute;
  top: 0;
  left: 18px;
  height: 100%;
  width: 2px;
  background: #d7e4ed;
}

@media (min-width: 992px) {
  .bd-sidebar {
    position: -webkit-sticky;
    position: sticky;
    top: 5rem;
    display: block !important;
    height: calc(100vh - 6rem);
    padding-left: 0.25rem;
    margin-left: -0.25rem;
    overflow-y: auto;
  }
}

@media (min-width: 992px) {
  .bd-layout {
    display: grid;
    grid-template-areas: "sidebar main";
    grid-template-columns: 1fr 4fr;
    gap: 0.5rem;
  }
}

@media (max-width: 991.98px) {
  .bd-main {
    max-width: 760px;
    margin-inline: auto;
  }
}

@media (min-width: 768px) {
  .bd-main {
    display: grid;
    grid-template-areas: "intro" "content";
    grid-template-rows: auto auto 1fr;
    gap: inherit;
  }
}

@media (min-width: 992px) {
  .bd-main {
    grid-template-areas: "intro" "content";
    grid-template-rows: auto 1fr;
  }
}
</style>
<template>
  <div class="container">
    <!-- Button trigger dropdown -->
    <div class="btn-toolbar">
      <bootstrap-dropdown
        :title="title1"
        btn-class="btn-danger"
        btn-split="true"
      >
        <div>
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </bootstrap-dropdown>
      <bootstrap-dropdown :title="title2">
        <div>
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </bootstrap-dropdown>
    </div>
    <bootstrap-dropdown :title="title2" btn-class="btn-warning btn-lg">
      <div>
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    </bootstrap-dropdown>

    <bootstrap-dropdown title="dropdown-menu-lg-end" btn-class="btn-info" btn-split="true" dropdown-class="dropdown-menu-end dropdown-menu-lg-start">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </bootstrap-dropdown>

    <div style="min-height: 100px">
      1111
      <hr />
    </div>
    <div class="btn-toolbar">
      <bootstrap-dropdown :title="title1" btn-class="btn-danger">
        <div>
          <a class="dropdown-item" href="#" @click="title1 = 'Actions'"
            >Action</a
          >
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </bootstrap-dropdown>
      <bootstrap-dropdown title="Drop right" placement="right-start" class="dropend">
        <div>
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </bootstrap-dropdown>
    </div>
    <bootstrap-dropdown title="Dark" btn-class="btn-warning" dropdown-class="dropdown-menu-dark">
      <div>
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
    </bootstrap-dropdown>

    <bootstrap-dropdown title="Auto top" btn-class="btn-info " btn-split="true" placement="top-start" class="dropup">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </bootstrap-dropdown>
  </div>
  <div style="min-height: 1000px">
    1111
    <hr />
  </div>
</template>
<script>
export default {
  data() {
    var self = this;
    return {
      title1: "Title 1",
      title2: "Title 2",
      isModal: false,
      result: "",
      actionSettings: [
        {
          title: "Cancel",
          class: "btn-secondary",
          click: function () {
            self.result = "Cancel clicked";
            self.isModal = false;
          },
        },
        {
          title: "Do Danger",
          class: "btn-danger",
          click: function () {
            self.result = "Danger clicked";
          },
        },
        {
          title: "Confirm",
          class: "btn-success",
          click: function () {
            self.result = "Confirm clicked";
          },
        },
      ],
    };
  },
  mounted() {},
};
</script>
