import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Unstable_StaticNextDatePicker as StaticNextDatePicker } from '@mui/x-date-pickers/StaticNextDatePicker';

import RestaurantIcon from '@mui/icons-material/Restaurant';
import {
  usePickerLayout,
  pickersLayoutClasses,
  PickersLayoutRoot,
  PickersLayoutContentWrapper,
} from '@mui/x-date-pickers/PickersLayout';

function ActionList(props) {
  const { onAccept, onClear, onCancel, onSetToday } = props;
  const actions = [
    { text: 'Accept', method: onAccept },
    { text: 'Clear', method: onClear },
    { text: 'Cancel', method: onCancel },
    { text: 'Today', method: onSetToday },
  ];

  return (
    <List>
      {actions.map(({ text, method }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton onClick={method}>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

ActionList.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onSetToday: PropTypes.func.isRequired,
};

function RestaurantHeader() {
  return (
    <Box
      sx={{
        // Place the element in the grid layout
        gridColumn: 1,
        gridRow: 1,
        // Center the icon
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RestaurantIcon />
    </Box>
  );
}

function CustomLayout(props) {
  const { toolbar, tabs, content, actionBar } = usePickerLayout(props);

  return (
    <PickersLayoutRoot
      ownerState={props}
      sx={{
        [`.${pickersLayoutClasses.actionBar}`]: {
          gridColumn: 1,
          gridRow: 2,
        },
        [`.${pickersLayoutClasses.toolbar}`]: {
          gridColumn: 2,
          gridRow: 1,
        },
      }}
    >
      <RestaurantHeader />
      {toolbar}
      {actionBar}
      <PickersLayoutContentWrapper className={pickersLayoutClasses.contentWrapper}>
        {tabs}
        {content}
      </PickersLayoutContentWrapper>
    </PickersLayoutRoot>
  );
}
export default function AddComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticNextDatePicker
        components={{
          Layout: CustomLayout,
          ActionBar: ActionList,
        }}
      />
    </LocalizationProvider>
  );
}