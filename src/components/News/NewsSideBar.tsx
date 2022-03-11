import React, { FC } from 'react';
import { List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 35,
    marginBottom: 20
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  listItemText: {
    fontSize: '1rem'
  },
  activeItem: {
    backgroundColor: 'rgb(54, 53, 87)',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: 'rgb(54, 53, 87)',
    }
  }
}));

interface IProps {
  title: string,
  mainTitle: string,
  checkedTheme: number | null,
  items: any[],
  handlerTheme: (id:number | null) => void
}

const NewsSideBar:FC<IProps> = ({ title, mainTitle, checkedTheme, items, handlerTheme }) => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.title}>{title}</Typography>
      <List disablePadding>
        <ListItem
          button onClick={() => handlerTheme(null)}
          className={classNames(classes.listItem, !checkedTheme && classes.activeItem)}
        >
          <ListItemText className={classes.listItemText}>{mainTitle}</ListItemText>
        </ListItem>
        {items.map((nav) => {
          return (
            <ListItem
              key={nav.id} button onClick={() => handlerTheme(nav.id)}
              className={classNames(classes.listItem, checkedTheme === nav.id && classes.activeItem)}
            >
              <ListItemText className={classes.listItemText}>{nav.title}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default NewsSideBar;
