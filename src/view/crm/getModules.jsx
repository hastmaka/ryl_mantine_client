import {
    IconLayoutDashboard,
    IconArticle, IconTags
} from "@tabler/icons-react";

const modules = {
    1: {
        label: 'Dashboard',
        icon: IconLayoutDashboard,
        name: 'dashboard',
        href: '/crm/dashboard',
    },
    2: {
        label: 'Articles',
        icon: IconArticle,
        name: 'client',
        href: '/crm/articles',
    },
    3: {
        label: 'Tags',
        icon: IconTags,
        name: 'tags',
        href: '/crm/tags',
    }
    // ['2.1']: {
    //     label: 'Staff',
    //     icon: IconUsersGroup,
    //     name: 'staff'
    // },
    // ['2.2']: {
    //     label: 'Analysts',
    //     icon: IconUsersGroup,
    //     name: 'analyst'
    // },
    // ['2.3']: {
    //     label: 'Assistant',
    //     icon: IconUsersGroup,
    //     name: 'assistant'
    // },
    // 3: {
    //     label: 'Calendar',
    //     icon: IconCalendar,
    //     name: 'calendar'
    // },
    // 4: {
    //     label: 'Report',
    //     icon: IconFileAnalytics,
    //     name: 'report',
    //     links: {
    //         400: { label: '1', name: '1' },
    //         401: { label: '2', name: '2' },
    //         402: { label: '3', name: '3' },
    //         403: { label: '4', name: '4' },
    //     }
    // },
    // 5: {
    //     label: 'People',
    //     icon: IconUsersGroup,
    //     name: 'people',
    //     links: {
    //         500: {
    //             label: 'Staff',
    //             icon: IconUsersGroup,
    //             name: 'staff'
    //         },
    //     }
    // },
    // 9999: {
    //     label: 'Test',
    //     icon: IconUsers,
    //     name: '/crm/test',
    // }
}

export const getModules = (userPermissions) => {
    const modulesStructure = []
    const permissionIds = new Set(userPermissions.map(({ permission_id }) => permission_id))

    Object.entries(modules)
        .sort((a, b) => parseFloat(a) - parseFloat(b))
        .forEach(([id, module]) => {
        if (permissionIds.has(+id)) {
            const { links } = module
            if (links) {
                const linksArray = Object.entries(links)
                    .filter(([key]) => permissionIds.has(+key))
                    .map(([, value]) => value)

                if (linksArray.length > 0) {
                    module = { ...module, links: linksArray }
                }
            }
            modulesStructure.push(module)
        }
    })

    return modulesStructure
}
