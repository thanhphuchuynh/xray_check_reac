import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';
import { KeyboardArrowRight } from '@material-ui/icons';

// import ExpandLess from '@material-ui/icons/ExpandLess';
// import ExpandMore from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList({ list }) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(true);
  console.log(list);
  // const handleClick = () => {
  //   setOpen(!open);
  // };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          LIST ABNORMALITIES DETECTION
        </ListSubheader>
      }
      className={classes.root}
    >
      {list.map((value, index) => (
        <ListItem key={index} button>
          <ListItemIcon>
            <KeyboardArrowRight
              style={{
                color: `rgb(${value.color[0]}, ${value.color[1]}, ${value.color[2]})`,
              }}
            />
          </ListItemIcon>
          <ListItemText>
            <span style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{value.name}</span>
              <span>{value.conf}</span>
            </span>
          </ListItemText>
          {/* <ListItemText primary={value.conf} /> */}
        </ListItem>
      ))}
      {/* <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem> */}
    </List>
  );
}
