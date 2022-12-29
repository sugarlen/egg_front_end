import Vue from 'vue'
export default
    Vue.component("header", {
        render: function (createElement) {
            console.log(this)
            return createElement("h4", [
                createElement(
                    "a",
                    { attrs: { name: "headerId", href: "#" + "headerId" } },
                    "this is a tag"
                ),
            ]);
        },
    });