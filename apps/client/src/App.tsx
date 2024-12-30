import "./app.css"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createRouter, RouterProvider} from '@tanstack/react-router'
import {routeTree} from './routeTree.gen.ts'
import {useAuth} from "./contexts/AuthContext.tsx";

const queryClient = new QueryClient();


const router = createRouter({routeTree, context: {auth: undefined!}});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const App = () => {
    const auth = useAuth()
    return (
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} context={{auth}}/>
            </QueryClientProvider>
    )
}

export default App;