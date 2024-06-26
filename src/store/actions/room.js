import request from '../../utils/requests';
import { getItemFromStorage } from '../../utils/localStorage';

const addRoomList = roomList => ({
  type: 'UPDATE_ROOMS',
  payload: roomList,
});

const updateRoomInfo = roomInfo => ({
  type: 'UPDATE_ROOM_INFO',
  payload: roomInfo,
});

export const addRoom = room => ({
  type: 'ADD_ROOM',
  payload: room,
});

export const removeRoomList = () => ({
  type: 'DELETE_ROOMS',
});

export const asyncAddRoomList = () => dispatch => {
  getItemFromStorage('token').then(token => {
    request('room/getList', 'POST', { token })
      .then(data => {
        const roomListObj = {};
        data.forEach(room => {
          roomListObj[room.id] = { ...room };
          roomListObj[room.id].Messages.map(message => {
            message.text = message.messageText;
            message.user = message.Sender;
          });
        });
        dispatch(addRoomList(roomListObj));
      })
      .catch(err => console.log(err));
  });
};

export const asyncCreateRoom = (roomName, userList) => dispatch =>
  getItemFromStorage('token').then(token => {
    userList.push(token);
    request('room/createRoom', 'POST', {
      name: roomName,
      users: userList,
    }).catch(err => console.log(err));
  });

export const changeActiveRoom = id => dispatch => {
  const roomInfo = {};
  roomInfo.roomId = id;
  dispatch(updateRoomInfo(roomInfo));
};
