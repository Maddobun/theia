// *****************************************************************************
// Copyright (C) 2018 TypeFox and others.
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
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
// *****************************************************************************

import { interfaces } from '@theia/core/shared/inversify';
import { DirtyDiffDecorator } from './dirty-diff-decorator';
import { DirtyDiffNavigator } from './dirty-diff-navigator';
import { DirtyDiffWidget, DirtyDiffWidgetFactory, DirtyDiffWidgetProps } from './dirty-diff-widget';

import '../../../src/browser/style/dirty-diff.css';

export function bindDirtyDiff(bind: interfaces.Bind): void {
    bind(DirtyDiffDecorator).toSelf().inSingletonScope();
    bind(DirtyDiffNavigator).toSelf().inSingletonScope();
    bind(DirtyDiffWidgetFactory).toFactory(({ container }) => props => {
        const child = container.createChild();
        child.bind(DirtyDiffWidgetProps).toConstantValue(props);
        child.bind(DirtyDiffWidget).toSelf();
        return child.get(DirtyDiffWidget);
    });
}
