<template>
  <v-list 
    v-if="hasBookItem" 
    three-line
    style="width:100%;" 
  >
    <div class="horizontal-container">
        <span v-for="item in items.items" :key="item.id">
            <horizontal-book-item v-if="item.id" :item="item"></horizontal-book-item>
        </span>
    </div>
  </v-list>
</template>

<script>
import HorizontalBookItem from "./HorizontalBookItem.vue";
export default {
  props: {
    items: {
      type: Object,
      required: false
    }
  },
  components: {
    HorizontalBookItem
  },
  computed: {
    hasBookItem() {
      console.log(this.items);
      return this.items !== undefined && this.items !== null;
    },
  },
};
</script>