import { PageRepository } from './page.repository';
import { DataProviderService } from '../data-providers/data-provider.service';

export class PageService {
  constructor(
    private repository: PageRepository,
    private dataProviderService: DataProviderService
  ) {}

  async getPageData(path: string, parameters: any = {}) {
    const [pageData, templates] = await Promise.all([
      this.repository.findPage(path),
      this.repository.getTemplates()
    ]);

    if (!pageData) {
      throw new Error('Page not found');
    }

    // Create templates map
    const templatesMap = templates.reduce((acc, template) => {
      acc[template.name] = template.content;
      return acc;
    }, {});

    // Process data sources
    const data = await this.processDataSources(pageData.PageDataSource, parameters);

    return {
      ...pageData,
      templates: templatesMap,
      data
    };
  }

  private async processDataSources(dataSources: any[], parameters: any) {
    const data: Record<string, any> = {};

    if (dataSources?.length > 0) {
      for (const dataSource of dataSources) {
        const sourceData = await this.dataProviderService.executeProvider(
          dataSource.provider,
          this.mapParameters(dataSource.parameterMap, parameters)
        );
        Object.assign(data, sourceData);
      }
    }

    return data;
  }

  private mapParameters(parameterMap: any, parameters: any) {
    const result: Record<string, any> = {};
    for (const [key, path] of Object.entries(parameterMap)) {
      result[key] = this.getValueByPath(parameters, path as string);
    }
    return result;
  }

  private getValueByPath(obj: any, path: string) {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  }
} 