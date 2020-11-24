<template>
  <div>
    <ImageLoader />
  </div>
</template>

<script>
export default {
  name: "test",
  components: {
    ImageLoader: () => import("../components/ImageLoader"),
  },
};
</script>
