
const { htmlToText } = require("html-to-text");
const { post } = require(".");
const prisma = require("../../prisma");
const { ErrorHandler } = require("../../utils/error");
const { parse: html_parser } = require("node-html-parser");

const find_first_img_src = (blocks) => {
    for (let x = 0; x < blocks.length; x++) {
        const block = blocks[x];
        const is_img = block.type === "image"
        if (is_img) return block.data.file.url;
        const has_blocks = block.blocks && block.blocks.length;
        if (has_blocks) {
            const found = find_first_img(child.blocks);
            return found;
        }
    }
}


const functions = {
    findByPkOr404: async pk => {
        const post = await prisma.posts.findUnique({ 
            where: { id: Number(pk) },
            include: {
                "postcategories": true
            }
        });
        if (!post) throw new ErrorHandler.get404("Post");
        return post;
    },
    findAll: async ({ page = 1, pageSize = 3, categories, UserId }) => {
        const where = {}
        if (categories) {
            // const cast_number = i => Number(i);
            // if (typeof(categories) === "string") {
            //     categories = categories.split(",");
            // } else categories = categories.map(c => c.id)
            // categories = categories.map(cast_number);

            where.postcategories = {
                some: {
                    categories: {
                        slug: {
                            in: categories
                        }
                    }
                }
            }
        }
        // categories = categories.split(",")
        // where 
        // if (query) where[Sequelize.Op.or] = [
        //     { contract_type: { [Sequelize.Op.like]: `%${query}%` } },
        //     { comment: { [Sequelize.Op.like]: `%${query}%` } }
        // ]
        const posts = await prisma.posts.findMany({
            where,
            skip: (page - 1) & page,
            take: pageSize,
        })
        for (let post of posts) {
            const { id: PostId } = post;
            const where = { PostId }
            const likes_count = prisma.postlikes.count({ where });
            const comments_count = prisma.postcomments.count({ where });
            
            post.content_excerpt = htmlToText(post.html_content).replace(/\n/g, "");
            post.meta = {
                likes_count: await likes_count,
                comments_count: await comments_count
            }
            if (UserId) {
                const liked = await prisma.postlikes.count({ 
                    where: {
                        PostId,
                        UserId
                    }
                })
                post.meta.liked = Boolean(liked);
            }
        }
        return posts;
    },
    createPost: async ({ 
        title, slug, html_content, status,
        BlogId, UserId, categories
     }) => {
        const data = {
            title, slug, html_content, status,
            BlogId, UserId
        }
        const categories_result = await prisma.categories.findMany({
            where: {
                OR: categories.map(category => ({
                    ...category
                }))
            }
        })
        for (let x=0; x < categories.length; x++) {
            let category = categories[x];
            let category_result = categories_result[x]
            if (!category_result) throw new ErrorHandler(404, "Not found", [
                `category ${JSON.stringify(category)} not found`
            ])
        }
        const post = await prisma.posts.create({ data })
        const postcategories = categories_result.map(async category => (
            await prisma.postcategories.create({
                data: {
                    CategoryId: category.id,
                    PostId: post.id
                }
            })
        ))
        await Promise.all(postcategories);
        return post;
    },
    updatePost: async ({pk,data}) => {
        let keys = Object.keys(data);
        const { categories, ...args } = data;

        let categories_result;
        if (categories) {
            categories_result = await prisma.categories.findMany({
                where: {
                    OR: categories.map(category => ({
                        ...category
                    }))
                }
            })
        }
        for (let x=0; x < categories.length; x++) {
            let category = categories[x];
            let category_result = categories_result[x]
            if (!category_result) throw new ErrorHandler(404, "Not found", [
                `category ${JSON.stringify(category)} not found`
            ])
        }

        const post = await prisma.posts.update({
            where: { id: Number(pk) },
            data: args
        })
        if (categories) {
            await prisma.postcategories.deleteMany({
                where: {
                    PostId: post.id
                }
            })
            const postcategories = categories_result.map(async category => (
                await prisma.postcategories.create({
                    data: {
                        CategoryId: category.id,
                        PostId: post.id
                    }
                }).catch(() => {}) // already exists
            ))
            await Promise.all(postcategories);
        }
        return post;
    },
    deletePost: async (pk) => await prisma.posts.delete({ where: { id: Number(pk) } })
}

const export_functions = {};

const insert_thumbnail_url = post => {
    try {
        const parsed = JSON.parse(post.html_content)
        const src = find_first_img_src(parsed.blocks);
        post.thumbnail_url = src; 
      } catch( err ) {
        console.log(err);
        post.thumbnail_url = "/coming-soon.png";
      }
      return post;
}
Object.keys(functions).forEach(key => {
    const func = functions[key];
    export_functions[key] = async (...args) => {
        const value = await func(...args);
        console.log({ value })
        const isArray = Array.isArray(value);
        if (isArray) {
            return value.map(insert_thumbnail_url);
        }
        return insert_thumbnail_url(value);
    }
})

module.exports = export_functions