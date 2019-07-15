import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'server-list',
                title    : 'Serveurs',
                type     : 'item',
                icon     : 'computer',
                url      : '/server-list'
            },
            {
                id       : 'datastore-list',
                title    : 'Datastores',
                type     : 'item',
                icon     : 'storage',
                url      : '/datastore-list'
            },
            {
                id       : 'middleware-list',
                title    : 'Middlewares',
                type     : 'item',
                icon     : 'settings_ethernet',
                url      : '/middleware-list'
            },
            {
                id       : 'artifact-list',
                title    : 'Applications',
                type     : 'item',
                icon     : 'apps',
                url      : '/artifact-list'
            }
        ]
    }
];
