import io from 'socket.io-client';
import { getItemFromStorage } from '../../utils/localStorage';
import { addRoom } from './room';
import user from '../reducers/user';

export const saveSocket = socket => ({
  type: 'ADD_SOCKET',
  payload: {
    socket,
  },
});

const addMessage = message => ({
  type: 'ADD_MESSAGE',
  payload: message,
});

const deleteSocket = () => ({
  type: 'DELETE_SOCKET',
});

export const addSocket = () => (dispatch, getState) => {
  const { socketConnect } = getState().socket;
  if (!socketConnect) {
    getItemFromStorage('token').then(token => {
      const socket = io.connect(`http://localhost:4050`);

      socket.on('connect', () => {
        socket.emit('conn', { token });
      });

      socket.on('message.sent', msg => {
        dispatch(addMessage(msg));
      });

      socket.on('addRoom', room => {
        const newRoom = {};
        newRoom[room.id] = { ...room };
        newRoom[room.id].Messages = [];
        newRoom[room.id].Users = [];
        dispatch(addRoom(newRoom));
      });

      dispatch(saveSocket(socket));
    });
  }
};

export const disconnectSocket = () => (dispatch, getState) => {
  const { socket } = getState().socket;
  socket.disconnect();
  dispatch(deleteSocket());
};

export const sendMessage = text => (dispatch, getState) => {
  const { token } = getState().userInfo.userInfo;
  const { roomId } = getState().roomList.activeRoom;
  const { socket } = getState().socket;
  const data = {
    msg: text,
    userToken: token,
    roomId,
  };
  socket.emit('message.send', data);
};
