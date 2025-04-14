import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class ComponentRepository {
  async getBlogComponents(blogId: number) {
    const components = await prisma.vueComponents.findMany({
      where: { BlogId: blogId }
    });

    return components.map(component => ({
      id: component.id,
      name: component.name,
      type: component.type,
      props: JSON.parse(component.props || '{}'),
      template: component.template
    }));
  }
} 