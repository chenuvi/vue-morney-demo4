<template>

  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">{{ tag.name }}
      </li>
    </ul>
    <h2><span>简小律记账本</span></h2>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {mixins} from 'vue-class-component';
import {Component} from 'vue-property-decorator';
import {TagHelper} from '@/mixins/TagHelper';

@Component

export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  toggle(tag: string) {
    console.log(tag);
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$store.commit('updateTag', this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
  h2{
    color:white;
    text-align: center;
    display: inline-block;
    margin-bottom:.5em;
  }
.tags {
  background: #3EB575;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      $bg: #EDEDED;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;

      &.selected {
        background: darken($bg, 25%);
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #fff;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}

</style>