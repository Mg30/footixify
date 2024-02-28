import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;

const Sidebar = () => (
    <Drawer
        variant="permanent"
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
        }}
    >
        <List>
            {/* Add navigation items here */}
            <ListItem button>
                <ListItemText primary="Home" />
            </ListItem>
            {/* More items */}
        </List>
    </Drawer>
);

export default Sidebar