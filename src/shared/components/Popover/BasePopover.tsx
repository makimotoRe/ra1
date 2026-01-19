import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Menu, PopoverOrigin, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { ReactNode, useCallback, useMemo, useState } from "react";

/**
 * Component : BasePopover
 * role      : マウスクリックでリスト表示(通常のpopoverはmuiに存在)
 * @param props
 * @param {ReactNode} props.children React node/s to be rendered as children of the SettignMenu. Must be Mui MenuItem components
 * @param {string} props.className CSS class applied to the MuiAppBar component
 * @param {string} props.label The label of the SettignMenu button. Accepts translation keys
 * @param {Element} props.icon The icon of the SettignMenu button.
 * @param {PopoverOrigin} prop.AnchorOrigin
 * @param {PopoverOrigin} prop.TransformOrigin
 */
let menuClassName: string | undefined = undefined;

export const BasePopover = (props: BasePopoverProps) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    children = null,
    className = "Menu",
    label,
    icon = defaultIcon,
    AnchorOrigin = defaultAnchorOrigin,
    TransformOrigin = defaultTransformOrigin,
  } = props;

  menuClassName = className;
  const handleMenu = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = useCallback(() => setAnchorEl(null), []);
  const context = useMemo(() => ({ onClose: handleClose }), [handleClose]);
  if (!children) return null;
  const open = Boolean(anchorEl);

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const existingOnClick = child.props.onClick;

      return React.cloneElement(child, {
        onClick: (event: React.MouseEvent) => {
          if (existingOnClick) {
            existingOnClick(event);
          }
          handleClose();
        },
      } as unknown as typeof child); // unknownを経由して型キャスト
    }
    return child;
  });

  return (
    <Root className={className}>
      <Tooltip title={label}>
        <IconButton
          aria-label={label}
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup={true}
          color="inherit"
          onClick={handleMenu}
        >
          {icon}
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        disableScrollLock
        anchorEl={anchorEl}
        anchorOrigin={AnchorOrigin}
        transformOrigin={TransformOrigin}
        open={open}
        onClose={handleClose}
      >
        {enhancedChildren}
      </Menu>
    </Root>
  );
};

export interface MenuProps {
  children?: ReactNode;
  className?: string;
  label?: string;
  icon?: ReactNode;
}

const PREFIX = `Ra-${menuClassName}`;

export const MenuClasses = {
  userButton: `${PREFIX}-userButton`,
  avatar: `${PREFIX}-avatar`,
};

const Root = styled("div", {
  name: PREFIX,
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  [`& .${MenuClasses.userButton}`]: {
    textTransform: "none",
    marginInlineStart: theme.spacing(0.5),
  },

  [`& .${MenuClasses.avatar}`]: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

interface BasePopoverProps extends MenuProps {
  AnchorOrigin?: {
    vertical: "top" | "center" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  TransformOrigin?: {
    vertical: "top" | "center" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}

const defaultAnchorOrigin: PopoverOrigin = {
  vertical: "bottom",
  horizontal: "right",
};

const defaultTransformOrigin: PopoverOrigin = {
  vertical: "top",
  horizontal: "right",
};
const defaultIcon = <SettingsIcon />;
