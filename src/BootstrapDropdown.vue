<style lang="scss"></style>
<template>
  <div class="dropdown" :class="{ show: isShow }">
    <button
      v-if="!btnSplit"
      class="btn"
      :class="btnClass"
      type="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      :id="id"
      ref="button"
      @click="switchState"
      :aria-expanded="isShow"
    >
      <span v-html="title"></span>
      <i class="fa-solid fa-chevron-down ps-3"></i>
    </button>

    <div class="btn-group" v-if="btnSplit">
      <button
        class="btn"
        :class="btnClass"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        :id="id"
        ref="button"
        v-html="title"
        @click="$emit('click')"
      ></button>
      <button
        class="btn dropdown-toggle-split"
        :class="btnClass"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        :aria-expanded="isShow"
        @click="switchState"
      >
        <i class="fa-solid fa-chevron-down"></i>
        <span class="visually-hidden">Toggle Dropdown</span>
      </button>
    </div>
    <div
      class="dropdown-menu"
      ref="popup"
      data-bs-popper="static"
      :class="dropdownClassComputed"
      :aria-labelledby="id"
      @click="clickInside"
    >
      <slot v-bind:dropdown="dropdownPointer"></slot>
    </div>
  </div>
</template>
<script>
var dropdownCounter = 0;
var getIdGenerator = function () {
  return "dropdown-" + dropdownCounter++;
};
var Placement = [
  "auto",
  "auto-start",
  "auto-end",
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "right",
  "right-start",
  "right-end",
  "left",
  "left-start",
  "left-end",
];
var DropDownEvents = ["click"];
if (window.ontouchstart || navigator.msMaxTouchPoints > 0) {
  DropDownEvents.push("touchstart");
}
var DropDownInstances = [];
var isAdded = false;

var clickOutSide = function (event) {
  for (var i in DropDownInstances) {
    var el = DropDownInstances[i].el;
    var fn = DropDownInstances[i].fn;
    if (event.target !== el && !el.contains(event.target)) {
      processFN(fn, event);
    }
  }
};

var processFN = function (fn, event) {
  if (!fn) {
    return;
  }
  setTimeout(function () {
    fn(event);
  }, 10);
};

var addDropdownInstances = function () {
  if (!isAdded) {
    for (var i in DropDownEvents) {
      document.addEventListener(DropDownEvents[i], clickOutSide);
    }
  }
};

var RemoveListeners = function () {
  if (DropDownInstances.length > 0) {
    return;
  }
  for (var i in DropDownEvents) {
    document.removeEventListener(DropDownEvents[i], clickOutSide);
  }
};

export default {
  name: "bootstrap-dropdown",
  data() {
    return {
      isShow: false,
      isManualHide: false,
    };
  },
  props: [
    "title",
    "placement",
    "btn-class",
    "btn-split",
    "dropdown-class",
    "noAutoHide",
  ],
  emits: ["hidden", "show", "click"],
  watch: {
    isShow: function (newValue) {
      if (newValue) {
        return this.$emit("show");
      }
      return this.$emit("hidden");
    },
  },
  computed: {
    dropdownPointer: function () {
      return this;
    },
    dropdownClassComputed: function () {
      var btnClass = "";
      if (this.isShow) {
        btnClass = btnClass + " show";
      }
      if (this.dropdownClass) {
        btnClass = btnClass + " " + this.dropdownClass;
      }
      return btnClass;
    },
  },
  methods: {
    hide: function () {
      this.isManualHide = true;
    },
    clickInside: function () {
      if (this.noAutoHide && this.isManualHide !== true && this.isShow) {
        return;
      }
      this.switchState();
    },
    switchState: function () {
      this.isShow = !this.isShow;
      this.isManualHide = false;
      var position = "bottom-start";
      if (Placement.indexOf(this.placement) !== -1) {
        position = this.placement;
      }
    },
  },
  beforeUnmount() {
    for (var i in DropDownInstances) {
      if (DropDownInstances[i].el === this.$el) {
        DropDownInstances.splice(i, 1);
      }
    }
    RemoveListeners();
  },
  mounted() {
    addDropdownInstances();
    var self = this;
    DropDownInstances.push({
      el: this.$el,
      fn: function () {
        self.isShow = false;
      },
    });
  },
  created: function () {
    this.id = getIdGenerator();
  },
};
</script>
