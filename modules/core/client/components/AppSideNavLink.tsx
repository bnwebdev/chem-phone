import { FC, useEffect, useState } from "react";
import { Button, Divider, MenuItem, ButtonProps, Menu } from '@mui/material'

import { NavItem } from "@app/module-client";
import { useTranslation } from "@app/i18n";

type Props = {
    item: NavItem
    buttonProps?: ButtonProps
    hideModals?: boolean
}

const AppSideNavLink: FC<Props> = ({ item, buttonProps, hideModals }) => {
    const i18n = useTranslation()
    const [anchor, setAnchor] = useState<HTMLElement | null>(null)

    useEffect(() => {
        hideModals && setAnchor(null)
    }, [hideModals])

    if ('link' in item) {
        return (
            <MenuItem key={item.label} style={{padding: 0}}>
                <Button href={item.link} key={item.label + item.link} {...buttonProps} style={{ width: '100%', padding: '12px 24px' }}>
                        {i18n.t(item.label) as string}
                </Button>
            </MenuItem>
        )
    }

    return (<>
        <MenuItem onClick={e => setAnchor(e.currentTarget)}>
            {i18n.t(item.label) as string}
        </MenuItem>
        <Menu
            open={Boolean(anchor)}
            anchorEl={anchor}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            onClose={() => setAnchor(null)}
        >
            {item.children.map((childItem, idx) => (<>
                <AppSideNavLink item={childItem} buttonProps={buttonProps} hideModals={hideModals || !Boolean(anchor)}/>
                {idx !== item.children.length -1 && <Divider />}
            </>))}
        </Menu>
    </>)
}

export default AppSideNavLink;