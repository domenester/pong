import ProviderGenerator from '../shared/provider-generator';
import socketClient from 'socket.io-client'

type onFunction = (param: (data?: any) => any) => void
type emitFunction = (...param: any) => void

export interface ISocketService {
  onMoveStick: onFunction,
  onRoomCreated: onFunction,
  onStartGame: onFunction,
  onBallOver: onFunction,
  ballOver: emitFunction,
  createRoom: emitFunction,
  stickMoved: emitFunction,
  joinRoom: emitFunction,
}

const buildValue = (): ISocketService => {
  const url = process.env.REACT_APP_SOCKET_URL || ''
  if (!url) { console.error('REACT_APP_SOCKET_URL env must be set') }
  const socket = socketClient(url)

  const onMoveStick = (moveStick: (data: any) => any) => {
    socket.on('moveStick', moveStick)
  }

  const onStartGame = (startGame: () => any) => socket.on('startGame', () => startGame())

  const onBallOver = (ballOver: () => any) => socket.on('ballOver', () => {
    console.log('reseting ballOver')
    ballOver()
  })

  const ballOver = (roomId: string, to: string) => socket.emit('ballOver', {roomId, to})

  const createRoom = () => socket.emit('createRoom')

  const joinRoom = (roomId: string) => socket.emit('joinRoom', {roomId})

  const onRoomCreated = (roomCreated: (data: any) => any) => {
    socket.on('roomCreated', roomCreated)
  }

  const stickMoved = (
    y: number, to: number, room: string
  ) => socket.emit('stickMoved', { y, to, room })

  return {
    onMoveStick,
    onRoomCreated,
    onStartGame,
    onBallOver,
    createRoom,
    stickMoved,
    joinRoom,
    ballOver
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
