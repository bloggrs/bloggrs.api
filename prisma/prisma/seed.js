const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Create an instance
//   const instance = await prisma.instances.create({
//     data: {
//       name: 'Hello World Vue App',
//       settings: {
//         appName: 'Hello World',
//         description: 'A simple Vue.js Hello World application'
//       },
//       type: 'vue',
//       currentStatus: 'active',
//       timezone: 'UTC',
//       locale: 'en',
//       customDomain: false,
//       sslEnabled: false,
//       maintenanceMode: false,
//       domain: null,
//       storageLimit: null,
//       bandwidthLimit: null,
//       userLimit: null,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       lastAccessedAt: null,
//       version: {
//         create: {
//         name: "v1.0.0",
//           isActive: true,
//           stability: 'stable',
//           createdAt: new Date(),
//           updatedAt: new Date(),
//           description: 'Initial version of Hello World Vue App',
//           releaseDate: new Date(),
//           changelog: 'First release',
//           requirements: {
//             node: ">=14.0.0",
//             npm: ">=6.0.0"
//           },
//           dependencies: {
//             vue: "^3.3.0",
//             pinia: "^2.1.0",
//             "vue-router": "^4.2.0"
//           },
//           breaking: false,
//           major: 1,
//           minor: 0,
//           patch: 0,
//           deprecatedAt: null
//         }
//       }
//     }
//   })
  // Create Vue component
//   const helloComponent = await prisma.vueComponents.create({
//     data: {
//       instance: { connect: { id: (await prisma.instances.findFirst()).id }},
//       name: 'HelloWorld',
//       description: 'A simple Hello World component', 
//       version: '1.0.0',
//       isPublic: true,
//       template: `
//         <div class="hello">
//           <h1>{{ message }}</h1>
//           <p>Welcome to your Vue.js app!</p>
//         </div>
//       `,
//       script: `
//         export default {
//           name: 'HelloWorld',
//           data() {
//             return {
//               message: 'Hello Vue!'
//             }
//           }
//         }
//       `,
//       style: `
//         .hello {
//           text-align: center;
//           margin-top: 60px;
//         }
//         h1 {
//           color: #42b983;
//         }
//       `,
//       props: {},
//       emits: {}
//     }
//   })

  // Create Vue store
//   const store = await prisma.vueStores.create({
//     data: {
//       instanceId: (await prisma.instances.findFirst()).id,
//       name: 'main',
//       type: 'PINIA', 
//       state: {
//         message: 'Welcome to the Store!'
//       }
//     }
//   })

  // Create Vue route
  const route = await prisma.vueRoutes.create({
    data: {
      instanceId: (await prisma.instances.findFirst()).id,
      path: '/',
      name: 'home',
      component: 'HelloWorld',
      meta: {
        title: 'Home'
      }
    }
  })

  console.log('Database has been seeded! 🌱')
  console.log('Created instance:', (await prisma.instances.findFirst()).name)
  console.log('Created component:', helloComponent.name)
  console.log('Created store:', store.name)
  console.log('Created route:', route.path)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })