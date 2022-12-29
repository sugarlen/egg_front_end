import Shake from "../views/heart/shake.vue";
import Suder from "../views/heart/suder.vue";
import Test01 from "../views/heart/test01.vue";
import SelectDemo from "../views/heart/select-demo.vue";
import TemplateDemo from "../views/heart/template-demo.vue";
import DragDemo from "../views/heart/drag-demo.vue";
import SanKey from "../views/heart/sanKey.vue";
import FlyLine from "../views/heart/flyLine.vue";
import Graph from "../views/heart/graph.vue";
import LogDemo from "../views/heart/log-demo.vue";

const heartRoutes = [
  {
    path: "/shake",
    name: "shake",
    meta: {
      title: "shake",
      // icon: 'fa fa-paper-plane'
    },
    component: Shake,
  },
  {
    path: "/suder",
    name: "suder",
    meta: {
      title: "suder",
      icon: "fa fa-paper-plane",
    },
    component: Suder,
  },
  {
    path: "/test01",
    name: "test01",
    meta: {
      title: "test01",
      icon: "fa fa-paper-plane",
    },
    component: Test01,
  },
  {
    path: "/selectDemo",
    name: "selectDemo",
    meta: {
      title: "selectDemo",
      icon: "fa fa-paper-plane",
    },
    component: SelectDemo,
  },
  {
    path: "/templateDemo",
    name: "templateDemo",
    meta: {
      title: "templateDemo",
      icon: "fa fa-paper-plane",
    },
    component: TemplateDemo,
  },
  {
    path: "/dragDemo",
    name: "dragDemo",
    meta: {
      title: "dragDemo",
      icon: "fa fa-paper-plane",
    },
    component: DragDemo,
  },
  {
    path: "/sanKey",
    name: "sanKey",
    meta: {
      title: "sanKey",
      icon: "fa fa-paper-plane",
    },
    component: SanKey,
  },
  {
    path: "/flyLine",
    name: "flyLine",
    meta: {
      title: "flyLine",
      icon: "fa fa-paper-plane",
    },
    component: FlyLine,
  },
  {
    path: "/graph",
    name: "graph",
    meta: {
      title: "graph",
      icon: "fa fa-paper-plane",
    },
    component: Graph,
  },
  {
    path: "/logDemo",
    name: "logDemo",
    meta: {
      title: "logDemo",
      icon: "fa fa-paper-plane",
    },
    component: LogDemo,
  },
];

export default heartRoutes;
