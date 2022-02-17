import Mountain from '../views/mountain/mountain.vue'
import Have from '../views/mountain/have.vue'
import Wood from '../views/mountain/wood.vue'
import Heart from '../views/heart/heart.vue'
import Shake from "../views/heart/shake.vue"
import Suder from "../views/heart/suder.vue"

const asideRoute = [
    {
        path: '/mountain',
        name: 'mountain',
        meta: {
            title: 'mountain',
            // icon: 'fa fa-paper-plane'
        },
        component: Mountain,
        children: [
            {
                path: '/have',
                name: 'have',
                meta: {
                    title: 'have',
                    // icon: 'fa fa-paper-plane'
                },
                component: Have,
            },
            {
                path: '/wood',
                name: 'wood',
                meta: {
                    title: 'wood',
                    icon: 'fa fa-paper-plane'
                },
                component: Wood,
            },
        ],
        
    },
    {
        path: '/heart',
        name: 'heart',
        component: Heart,
        meta: {
            title: 'heart',
            // icon: 'fa fa-paper-plane'
        },
        children: [
            {
                path: '/shake',
                name: 'shake',
                meta: {
                    title: 'shake',
                    // icon: 'fa fa-paper-plane'
                },
                component: Shake,
            },
            {
                path: '/suder',
                name: 'suder',
                meta: {
                    title: 'suder',
                    icon: 'fa fa-paper-plane'
                },
                component: Suder,
            },
        ],
    },
]

export default asideRoute