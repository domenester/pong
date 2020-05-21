import ProviderGenerator from '../shared/provider-generator';
import socketClient from 'socket.io-client'

type onFunction = (param: (data?: any) => any) => void
type emitFunction = (...param: any) => void

export interface ISocketService {
  stickMoved: emitFunction,
  onMoveStick: onFunction,
  createRoom: emitFunction,
  onRoomCreated: onFunction,
  ballOver: emitFunction,
  onBallOver: onFunction,
  getRooms: emitFunction,
  onGetRooms: onFunction,
  joinRoom: emitFunction,
  onStartGame: onFunction,
  connected: emitFunction
}

const buildValue = (): ISocketService => {
  const url = process.env.REACT_APP_SOCKET_URL || ''
  if (!url) { console.error('REACT_APP_SOCKET_URL env must be set') }
  const socket = socketClient(url)

  const onMoveStick = (moveStick: (data: any) => any) => {
    socket.on('moveStick', moveStick)
  }

  const onStartGame = (startGame: () => any) => socket.on('startGame', () => startGame())

  const onBallOver = (
    ballOver: (data: any) => any
  ) => socket.on('ballOver', (data: any) => ballOver(data))

  const ballOver = (
    roomId: string,
    to: string,
    pointOf: string
  ) => socket.emit('ballOver', {roomId, to, pointOf})

  const createRoom = () => socket.emit('createRoom')

  const joinRoom = (roomId: string) => socket.emit('joinRoom', {roomId})

  const onRoomCreated = (roomCreated: (data: any) => any) => {
    socket.on('roomCreated', roomCreated)
  }

  const stickMoved = (
    y: number, to: number, room: string
  ) => socket.emit('stickMoved', { y, to, room })

  const getRooms = () => socket.emit('getRooms')

  const onGetRooms = (onGetRooms: (data: any) => any) => {
    socket.on('onGetRooms', onGetRooms)
  }

  const connected = () => socket.emit('connected')

  return {
    stickMoved,
    onMoveStick,
    createRoom,
    onRoomCreated,
    ballOver,
    onBallOver,
    getRooms,
    onGetRooms,
    onStartGame,
    joinRoom,
    connected
  };
}

const providerGenerated = ProviderGenerator(buildValue)

const SocketServiceProvider = providerGenerated.provider
const SocketServiceContext = providerGenerated.context
const useSocketServiceValue = providerGenerated.useValue

export {
  SocketServiceProvider,
  SocketServiceContext,
  useSocketServiceValue
};
