// *****************************************************************************
// Copyright (C) 2023 Ericsson and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
// *****************************************************************************

import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { Disposable } from '@theia/core/lib/common/disposable';
import { inject, injectable } from '@theia/core/shared/inversify';
import { URI } from '@theia/core/shared/vscode-uri';
import { IconRegistry } from '@theia/monaco/lib/browser/monaco-icon-registry-types';
import * as path from 'path';
import { IconContribution, DeployedPlugin } from '../../common/plugin-protocol';

@injectable()
export class PluginIconService implements Disposable, FrontendApplicationContribution {

    @inject(IconRegistry)
    protected readonly iconRegistry: IconRegistry;

    // @inject(ContributionProvider)
    // protected readonly iconContributions: ContributionProvider<IconContribution>;

    async onStart(): Promise<void> {
        console.log('**** alvs, PluginIconService onStart');
        // for (const contribution of this.iconContributions.getContributions()) {
        //     this.register(contribution);
        // }
    }

    register(contribution: IconContribution, plugin: DeployedPlugin): Disposable {
        const defaultIcon = contribution.defaults;
        if (IconContribution.isIconDefinition(defaultIcon)) {
            const location = defaultIcon.location;
            const format = getFileExtension(location);
            const fontId = getFontId(contribution.extensionId, location);
            const definition = this.iconRegistry.registerIconFont(fontId, { src: [{ location: URI.file(location), format }] });
            this.iconRegistry.registerIcon(contribution.id, {
                fontCharacter: defaultIcon.fontCharacter,
                font: {
                    id: fontId,
                    definition
                }
            }, contribution.description);
        } else {
            this.iconRegistry.registerIcon(contribution.id, { id: defaultIcon.id}, contribution.description);
        }
        console.warn('**** alvs, iconContributionr registered: ', contribution.id);
        return Disposable.NULL;
    }

    dispose(): void {
        // Implement me
    }
}

function getFontId(extensionId: string, fontPath: string): string {
    return path.join(extensionId, fontPath);
}

function getFileExtension(filePath: string): string {
    const index = filePath.lastIndexOf('.');
    return index === -1 ? '' : filePath.substring(index + 1);
}
