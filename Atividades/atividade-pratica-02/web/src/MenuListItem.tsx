import {ReactElement} from "react";
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface MenuListItemProps {
    icon: ReactElement; // Or whatever is the type of your `icon`
    text: string;
    handleItemClick: (text: string) => void;
}

const MenuListItem: React.FC<MenuListItemProps> = ({ icon, text, handleItemClick }) => (
    <ListItem disablePadding>
        <ListItemButton onClick={() => handleItemClick(text)}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
    </ListItem>
);

export default MenuListItem;