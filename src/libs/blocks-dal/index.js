const prisma = require("../../prisma");
const yup = require("yup");

const setBlocks = async ({ PageId, blocks, BlockId, first_execution_completed }) => {
    if (!blocks.length && blocks) blocks = [ blocks ]
    
    /*
        Delete all existing blocks and related data
    */
   if (!first_execution_completed) {
       await (async function() {
           const blocks__ = await prisma.blocks.findMany({
               where: { PageId }
           })
           let transactions = [];
           for (let block of blocks__){
               const { id: BlockId } = block;
               transactions = transactions.concat([
                   prisma.blockchildrens.deleteMany({
                       where: { BlockId }
                   }),
                   prisma.children.deleteMany({
                       where: { BlockId }
                   }),
                   prisma.blockattributes.deleteMany({
                       where: { BlockId }
                   }),
               ])
           }
           await prisma.$transaction(transactions)

           await prisma.blocks.deleteMany({
               where: { PageId }
           })
       })()
   }


    /* END */


    if (BlockId) {
        for (block of blocks){
            if (!block.children) block.children = []
            
            const _block_ = await prisma.blocks.create({
                data: { 
                    name: block.name, 
                    PageId,
                    isChild: true
                }
            })
            console.log({_block_})
            for (attr_key of Object.keys(block.attributes)){
                const attr = { 
                    key: attr_key, 
                    value: block.attributes[attr_key],
                    type: typeof(block.attributes[attr_key]) 
                }
                await prisma.blockattributes.create({
                    data: { ...attr, BlockId: _block_.id }
                })
            }
            console.log('_block_.id', _block_.id, _block_, BlockId )
            const child = await prisma.children.create({
                data: { BlockId: _block_.id }
            })
            await prisma.blockchildrens.create({
                data: {
                    BlockId,
                    ChildrenId: child.id
                }
            })    
            if (block.children.length) await setBlocks({
                PageId, blocks: block.children, BlockId: _block_.id,
                first_execution_completed: true
            }) 
            
        }

    } else {
        for (block of blocks){
            if (!block.children) block.children = []
            
            const _block_ = await prisma.blocks.create({
                data: { 
                    name: block.name, 
                    PageId 
                } 
            })
            for (attr_key of Object.keys(block.attributes)){
                const attr = { 
                    key: attr_key, 
                    value: block.attributes[attr_key],
                    type: typeof(block.attributes[attr_key]) 
                }
                await prisma.blockattributes.create({
                    data: { ...attr, BlockId: _block_.id }
                })
            }

            if (block.children.length) await setBlocks({
                PageId, blocks: block.children, BlockId: _block_.id,
                first_execution_completed: true
            }) 
        }    
    }
}

const getBlock = async (block) => {
    const { id: BlockId } = block;
    const formatted_block = { ... block }
    const attributes = await prisma.blockattributes.findMany({
        where: { BlockId: block.id }
    })
    formatted_block.attributes = {}
    attributes.forEach(attr => 
        formatted_block.attributes[attr.key] = attr.value
    )

    formatted_block.children = [];
    const blockchildrens = await prisma.blockchildrens.findMany({
        where: { BlockId }
    })
    for (blockchildren of blockchildrens){
        const child = await prisma.children.findUnique({
            where: { id: blockchildren.ChildrenId }
        })
        const block__ = await prisma.blocks.findUnique({
            where: { id: child.BlockId }
        })
        const childblock = await getBlock(block__)
        formatted_block.children.push(childblock)
    }
    return formatted_block;
}

module.exports = {
    getBlocks: async ({ PageId }) => {
        const formatted_blocks = []
        const blocks = await prisma.blocks.findMany({
            where: { PageId: PageId, isChild: false }
        })

        for (block of blocks) {
            const formatted_block = await getBlock(block)
            formatted_blocks.push(formatted_block)
        }
        return formatted_blocks
    },
    setBlocks
}