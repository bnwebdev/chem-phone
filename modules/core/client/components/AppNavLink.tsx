import { FC, MouseEvent, useState } from "react";
import { Button, Menu, MenuItem, ButtonProps } from '@mui/material'

import { NavItem } from "@app/module-client";
import { useTranslation } from "@app/i18n";

type Props = {
    item: NavItem
    buttonProps?: ButtonProps[]
    _deep?: number
}

const useProps = (props: ButtonProps[], deep: number) => {
    if (props.length <= 1) {
        return props[0] || {}
    }

    return props[deep] || props[props.length - 1]
}

const defaultButtonProps: ButtonProps[] = [
    {
        style: { color: '#fff' },
        variant: 'text',
    },
    {}
]

const AppNavLink: FC<Props> = ({ item, buttonProps = defaultButtonProps, _deep = 0 }) => {
    const i18n = useTranslation()
    const props = useProps(buttonProps, _deep)

    const [anchor, setAnchor] = useState<HTMLElement | null>(null)

    const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchor(event.currentTarget);
    };

    const handleCloseMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchor(null);
    }; 

    if ('link' in item) {
        return (
            _deep === 0 
              ? <Button href={item.link} key={item.label + item.link} {...props}>
                   {i18n.t(item.label) as string}
                </Button>
              :
                <MenuItem key={item.label} style={{padding: 0}}>
                    <Button href={item.link} key={item.label + item.link} {...props} style={{ width: '100%', padding: '12px 24px' }}>
                            {i18n.t(item.label) as string}
                    </Button>
                </MenuItem>
        )
    }

    return(_deep === 0
        ? <div key={item.label + 'key-menu'}>
            <Button variant="text" onClick={handleOpenMenu} {...props}>
                {i18n.t(item.label) as string}
            </Button>
            <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchor}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchor)}
                onClose={handleCloseMenu}
            >
                {item.children.map((childItem) => (
                    <AppNavLink item={childItem} buttonProps={buttonProps} _deep={_deep + 1}/>
                ))}
            </Menu>
          </div>
        : <>
            <MenuItem onClick={handleOpenMenu} key={item.label + 'key-menu'} style={{padding: 0}} >
                <Button variant="text" onClick={handleOpenMenu} {...props} style={{ width: '100%', padding: '12px 24px' }}>
                        {i18n.t(item.label) as string}
                </Button>
            </MenuItem>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchor}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchor)}
                onClose={handleCloseMenu}
            >
                {item.children.map((childItem) => (
                    <AppNavLink item={childItem} buttonProps={buttonProps} _deep={_deep + 1}/>
                ))}
            </Menu>
        </>
    )
}

export default AppNavLink;