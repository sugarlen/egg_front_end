<template>
  <div>
    <Tem :level="1" />
  </div>
</template>
<script>
import Tem from "./components/template.js";
export default {
  name: "test01",
  components: { Tem },
};
</script>