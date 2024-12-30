import { createFileRoute, redirect } from '@tanstack/react-router'
import Chat from '../components/Chat/Chat.tsx'


export const Route = createFileRoute('/chat')({
  component: Chat,
  beforeLoad: ({context}) => {
    if(context?.auth?.isLogged){
      return;
    }
    throw redirect({to: '/'})
  },
})
