import { PrismaClient } from '@prisma/client';
import * as ejs from 'ejs';

const prisma = new PrismaClient();

export class ComponentService {
  async renderComponent(component: any, props: any) {
    // First compile any included templates
    const content = await this.compileIncludes(component.content);
    
    // Then render the main template
    return ejs.render(content, { props });
  }

  private async compileIncludes(content: string) {
    const includeRegex = /<%- include\('([^']+)', ?([^)]+)\) %>/g;
    let result = content;
    
    for (const match of content.matchAll(includeRegex)) {
      const [fullMatch, templateName, props] = match;
      const template = await prisma.componentTemplate.findUnique({
        where: { name: templateName }
      });
      
      if (template) {
        result = result.replace(fullMatch, template.content);
      }
    }

    return result;
  }
} 