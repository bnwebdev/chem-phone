import { FC, MouseEvent, useEffect, useState } from "react";
import { Button, Menu, MenuItem, ButtonProps } from '@mui/material'

import { NavItem } from "@app/module-client";
import { useTranslation } from "@app/i18n";

type Props = {
    item: NavItem
    buttonProps?: ButtonProps[]
    commonButtonProps?: ButtonProps
    _deep?: number
    hideModals?: boolean
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

const AppNavLink: FC<Props> = ({ item, buttonProps = defaultButtonProps, _deep = 0, hideModals, commonButtonProps = {} }) => {
    const i18n = useTranslation()
    const props = useProps(buttonProps, _deep)

    const [anchor, setAnchor] = useState<HTMLElement | null>(null)

    useEffect(() => {
        hideModals && setAnchor(null)
    }, [hideModals])
    
    const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchor(event.currentTarget);
    };

    const handleCloseMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchor(null);
    }; 

    if ('link' in item) {
        return (
            _deep === 0 
              ? <Button href={item.link} key={item.label + item.link} {...props} {...commonButtonProps}>
                   {i18n.t(item.label) as string}
                </Button>
              :
                <MenuItem key={item.label} style={{padding: 0}}>
                    <Button
                      href={item.link}
                      key={item.label + item.link}
                      {...props}
                      {...commonButtonProps}
                      style={{ width: '100%', padding: '12px 24px' }}
                    >
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
                {item.children.map((childItem, idx) => (
                    <AppNavLink
                      item={childItem}
                      buttonProps={buttonProps}
                      _deep={_deep + 1}
                      key={childItem.label + idx}
                      hideModals={hideModals || !Boolean(anchor)}
                      commonButtonProps={{...commonButtonProps, onClick: (e) => {
                        const onClick = commonButtonProps.onClick

                        handleCloseMenu(e)
                        onClick && onClick(e)
                      }}}
                    />
                ))}
            </Menu>
          </div>
        : 
            <MenuItem onClick={handleOpenMenu} key={item.label + 'key-menu'} style={{padding: 0}} >
                <Button variant="text" onClick={handleOpenMenu} {...props} style={{ width: '100%', padding: '12px 24px' }}>
                        {i18n.t(item.label) as string}
                </Button>
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
                        <AppNavLink
                          item={childItem}
                          buttonProps={buttonProps}
                          _deep={_deep + 1}
                          hideModals={hideModals || !Boolean(anchor)}
                          commonButtonProps={{...commonButtonProps, onClick: (e) => {
                            const onClick = commonButtonProps.onClick
    
                            handleCloseMenu(e)
                            onClick && onClick(e)
                          }}}
                        />
                    ))}
                </Menu>
            </MenuItem>
    )
}

export default AppNavLink;