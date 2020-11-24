<template>
  <div class="image-upload" @click="loadImageShow = true" :style="styleObject">
    <q-icon class="image-upload-icon" name="fas fa-file-image"></q-icon>

    <q-dialog v-model="loadImageShow" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your address</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="imageUrl"
            autofocus
            @keyup.enter="loadImageShow = false"
          />
        </q-card-section>

        <q-card-actions align="center" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: "ImageLoader",
  data: () => ({
    loadImageShow: true,
    imageUrl: "",
  }),
  computed: {
    styleObject() {
      return {
        backgroundImage: 'url("' + this.imageUrl + '")',
      };
    },
  },
};
</script>

<style lang="stylus">
@import '~quasar-variables'
.image-upload input[type='file']
    display none
    position absolute
    width 100%
    height 100%

.image-upload
    position relative
    min-width 300px
    min-height 300px
    border 3px solid $primary
    transition 400ms
    background-position center
    background-size cover
    &:hover
        border 5px solid $primary
        &::before
            content ""
            position absolute
            top 0px
            bottom 0px
            left 0px
            right 0px
            background-color $primary
            opacity 0.2

.image-upload-icon
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
    color $primary
    font-size 2rem
</style>
