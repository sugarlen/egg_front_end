import Heart from "../views/heart/heart.vue";
import heartRoutes from "./heart";
import Mountain from "../views/mountain/mountain.vue";
import Have from "../views/mountain/have.vue";
import Wood from "../views/mountain/wood.vue";
import Branch from "../views/mountain/branch.vue";
import Pas from "../views/pas/pas.vue";
import PasFonts from "../views/pas/pasFonts.vue";
import PasFaker from "../views/pas/pasFaker.vue";

const asideRoute = [
  {
    path: "/mountain",
    name: "mountain",
    meta: {
      title: "mountain",
      // icon: 'fa fa-paper-plane'
    },
    component: Mountain,
    children: [
      {
        path: "/have",
        name: "have",
        meta: {
          title: "have",
          // icon: 'fa fa-paper-plane'
        },
        component: Have,
      },
      {
        path: "/wood",
        name: "wood",
        meta: {
          title: "wood",
          icon: "fa fa-paper-plane",
        },
        component: Wood,
      },
      {
        path: "/branch",
        name: "branch",
        meta: {
          title: "branch",
          icon: "fa fa-paper-plane",
        },
        component: Branch,
      },
    ],
  },
  {
    path: "/heart",
    name: "heart",
    component: Heart,
    meta: {
      title: "heart",
      // icon: 'fa fa-paper-plane'
    },
    children: heartRoutes,
  },

  {
    path: "/pas",
    name: "pas",
    component: Pas,
    meta: {
      title: "pas",
      // icon: 'fa fa-paper-plane'
    },
    children: [
      {
        path: "/pasFonts",
        name: "pasFonts",
        meta: {
          title: "pasFonts",
          // icon: 'fa fa-paper-plane'
        },
        component: PasFonts,
      },
      {
        path: "/pasFaker",
        name: "pasFaker",
        meta: {
          title: "pasFaker",
          icon: "fa fa-paper-plane",
        },
        component: PasFaker,
      },
    ],
  },
];

export default asideRoute;
