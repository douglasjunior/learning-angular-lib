import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function ngAdd(): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const workspaceConfig = tree.read('/angular.json');

    if (!workspaceConfig) {
      throw new Error('Could not find Angular workspace configuration');
    }

    const workspace = JSON.parse(workspaceConfig.toString());
    const stylePath = 'node_modules/@design-system/lib/src/lib/styles/theme.css';

    // Itera sobre todos os projetos do workspace
    Object.entries(workspace.projects).forEach(([projectName, project]: [string, any]) => {
      // Verifica se o projeto tem configuração de build
      if (!project.architect?.build?.options) {
        context.logger.warn(`Project ${projectName} doesn't have build configuration, skipping...`);
        return;
      }

      project.architect.build.options.styles = project.architect.build.options.styles ?? [];

      // Adiciona o arquivo de estilo aos styles globais
      if (!project.architect.build.options.styles.includes(stylePath)) {
        project.architect.build.options.styles.push(stylePath);
        context.logger.info(`Added styles to project: ${projectName}`);
      }
    });

    // Salva as alterações no angular.json
    tree.overwrite('/angular.json', JSON.stringify(workspace, null, 2));

    context.logger.info('Updated global styles in angular.json for all applicable projects');

    return tree;
  };
}
