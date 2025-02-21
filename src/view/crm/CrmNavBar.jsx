import {ScrollArea, NavLink } from '@mantine/core';
import classes from './Main.module.scss';
import {getModules} from "./getModules.jsx";
import {useLocation} from "react-router-dom";

const user = {
    permissions: [
        {
            permission_id:1,
            permission_description: 'Gives access to clients module'
        },
        {
            permission_id:2,
            Permission_description: 'Gives access to employees module'
        },
        {
            permission_id:3,
            Permission_description: 'Gives access to employees module'
        },
    ]
}

export default function CrmNavBar() {
    const {pathname} = useLocation();
    const modules = getModules(user.permissions)
    const links = modules.map((item) => {
        return <NavLink
            key={item.label}
            color='var(--color-2)'
            active={item.href === pathname}
            label={item.label}
            description={item.description}
            rightSection={item.rightSection}
            leftSection={<item.icon size="1rem" stroke={1.5} />}
            onClick={() => navigate(item.href)}
        />
    });

    return (
        <ScrollArea className={classes.links}>
            {links}
        </ScrollArea>
    )
}
